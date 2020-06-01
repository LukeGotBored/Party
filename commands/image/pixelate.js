const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");
const { performance } = require("perf_hooks");

module.exports = {
  name: "pixelate",
  description: "needs more jpeg",
  guildOnly: false,
  aliases: ["pixelize"],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    const canvas = Canvas.createCanvas(avatar.width, avatar.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(avatar, 0, 0);
    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let value = 15;
    const remainder = width % value;
    value -= remainder;
    const pixelatedCanvas = Canvas.createCanvas(canvas.width, canvas.height);
    const pixelatedCtx = pixelatedCanvas.getContext("2d");

    // loops through every {{value}} pixels
    for (let y = 0; y < height; y += value) {
      for (let x = 0; x < width; x += value) {
        let i = (x + y * width) * 4; // index
        let r = imageData.data[i];
        let g = imageData.data[i + 1];
        let b = imageData.data[i + 2];
        let a = imageData.data[i + 3];
        pixelatedCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`; // get pixel color
        pixelatedCtx.fillRect(x, y, value, value);
      }
    }

    const attachment = new Discord.Attachment(
      pixelatedCanvas.toBuffer(),
      user.username + "_pixelated.png"
    );

    message.channel.send(attachment);
  }
};
