const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "sepia",
  description: "good ol'sepia",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    const avatar = await Canvas.loadImage(user.displayAvatarURL({size: 1024, format: "png"}));
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    function sepiaPixel(r, g, b, _a, i) {
      imageData.data[i] = Math.min(0.393 * r + 0.769 * g + 0.189 * b, 255);
      imageData.data[i + 1] = Math.min(0.349 * r + 0.686 * g + 0.168 * b, 255);
      imageData.data[i + 2] = Math.min(0.272 * r + 0.534 * g + 0.131 * b, 255);
    }

    message.client.util.scan(imageData, sepiaPixel);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_sepia.png"
    );

    message.channel.send(attachment);
  }
};
