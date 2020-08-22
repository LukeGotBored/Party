const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "stonks",
  description: "ah yes, stonks",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(1024, 766);
    const ctx = canvas.getContext("2d");

    const avatar = await Canvas.loadImage(user.displayAvatarURL({size: 1024, format: "png"}));
    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FCA4C487A-ABF2-483A-8036-05EC72F8597C.jpeg?v=1581063297322"
    );

    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 90, 50, 260, 260);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_brazzers.png"
    );

    message.channel.send(attachment);
  }
};
