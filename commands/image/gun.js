const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "gun",
  description: "vibe check",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "))
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    const avatar = await Canvas.loadImage(user.displayAvatarURL({size: 1024, format: 'png'}));
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2F059b6e27-079f-4cb1-a5c4-1f2bd7.png?v=1581025220704"
    );
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), user.username + "_gun.png");

    message.channel.send(attachment);
  }
};