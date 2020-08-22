const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "binarize",
  description: "Binarize any image!\n011000110111010101110100011101000010111001101100011110010010111101110011011001010110001101110010011001010111010001101100011010010110111001101011",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png', size: 1024}));
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const threshold = 165;

    function binarizePixel(r, g, b, _a, i) {
      const intensity = (r + g + b) / 3;
      if (intensity < threshold) {
        // darker, make black
        imageData.data[i] = 0;
        imageData.data[i + 1] = 0;
        imageData.data[i + 2] = 0;
      } else {
        // lighter, make white
        imageData.data[i] = 255;
        imageData.data[i + 1] = 255;
        imageData.data[i + 2] = 255;
      }
    }

    message.client.util.scan(imageData, binarizePixel);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);

    const binarized = canvas.toBuffer();

    const attachment = new Discord.MessageAttachment(
      binarized,
      user.username + "_binarize.png"
    );

    message.channel.send(attachment);
  }
};
