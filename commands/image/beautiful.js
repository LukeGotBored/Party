const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "beautiful",
  description: "a masterpiece",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    const avatar1 = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar1, 340, 30, 140, 140);

    const avatar2 = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar2, 340, 290, 140, 140);

    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FA931F4B0-C5F4-419C-9765-3FC74607A267.png?v=1581027542455"
    );
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_brazzers.png"
    );

    message.channel.send(attachment);
  }
};
