const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "disabilities",
  description: "watch out!",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "))
    const canvas = Canvas.createCanvas(512, 421);
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar, 310, 145, 200, 200);

    
    const foreground = await Canvas.loadImage("https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fdisabilities_overlay.png?v=1581198847974");
    ctx.drawImage(foreground, 0, 0, canvas.width, canvas.height);
    





    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_disgusting.png"
    );

    message.channel.send(attachment);
  }
};
