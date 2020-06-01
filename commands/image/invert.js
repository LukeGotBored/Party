const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "invert",
  description: "dlrow olleh",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    function invertPixel(r, g, b, _a, i) {
      imageData.data[i] = 255 - r;
      imageData.data[i + 1] = 255 - g;
      imageData.data[i + 2] = 255 - b;
    }

    message.client.util.scan(imageData, invertPixel);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_inverted.png"
    );

    message.channel.send(attachment);
  }
};
