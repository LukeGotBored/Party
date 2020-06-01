const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "bw",
  description: "turn stuff black and white",
  guildOnly: false,
  aliases: ["grayscale", "mono", "blackwhite", "gray"],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "))
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    function grayscalePixel(r, g, b, _a, i) {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      imageData.data[  i  ] = gray;
      imageData.data[i + 1] = gray
      imageData.data[i + 2] = gray;
    }

    message.client.util.scan(imageData, grayscalePixel);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_bw.png"
    );

    message.channel.send(attachment);
  }
};
