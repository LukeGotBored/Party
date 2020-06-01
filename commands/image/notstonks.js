const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "notstonks",
  description: "oh no, not stonks",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "))

    const canvas = Canvas.createCanvas(960, 576);
    const ctx = canvas.getContext("2d");

    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2F0DB5CF21-8B44-4514-9E0C-2B56BC8084AC.jpeg?v=1581063299710"
    );
    
  
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 150, 5, 190, 190);

    const attachment = new Discord.Attachment(canvas.toBuffer(), user.username + "_notstonks.png");

    message.channel.send(attachment);
  }
};