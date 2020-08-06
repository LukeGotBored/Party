const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "jpeg",
  description: "needs more jpeg",
  guildOnly: false,
  aliases: ["morejpeg"],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar, 0, 0, canvas.height, canvas.width);

    const jpegged = canvas.toBuffer("image/jpeg", { quality: 0.04 });

    const attachment = new Discord.Attachment(
      jpegged,
      user.username + "_jpeg.jpeg"
    );

    message.channel.send(attachment);
  }
};
