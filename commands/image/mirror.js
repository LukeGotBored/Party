const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "mirror",
  description: "m i r r o r",
  guildOnly: false,
  aliases: ["obabo"],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    const avatar = await Canvas.loadImage(user.displayAvatarURL({size: 1024, format: "png"}));
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    const { width, height } = canvas;
    const cut = width / 2;

    const halfImageData = ctx.getImageData(0, 0, cut, height);
    const halfCanvas = Canvas.createCanvas(
      halfImageData.width,
      halfImageData.height
    );
    const halfCtx = halfCanvas.getContext("2d");
    halfCtx.putImageData(halfImageData, 0, 0);

    const flippedHalfCanvas = Canvas.createCanvas(
      halfImageData.width,
      halfImageData.height
    );
    const flippedHalfCtx = flippedHalfCanvas.getContext("2d");

    flippedHalfCtx.translate(cut, 0); //
    flippedHalfCtx.scale(-1, 1); // flip
    flippedHalfCtx.drawImage(halfCanvas, 0, 0); //

    const obaboCanvas = Canvas.createCanvas(cut * 2, height);
    const obaboCtx = obaboCanvas.getContext("2d");

    obaboCtx.drawImage(halfCanvas, 0, 0);
    obaboCtx.drawImage(flippedHalfCanvas, cut, 0);

    const obabied = obaboCanvas.toBuffer();

    const attachment = new Discord.MessageAttachment(
      obabied,
      user.username + "_obabo.png"
    );

    message.channel.send(attachment);
  }
};
