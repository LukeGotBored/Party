const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "google",
  description: "let's google something",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fgoogle_base.png?v=1581108240815"
    );

    if(!args.join(" ")){
      var result = "how to use commands on Party"
    }
    else(result = args.join(" "))
    
    const canvas = Canvas.createCanvas(overlay.width, overlay.height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.75;
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(result, 126, 220);
    ctx.globalAlpha = 1;

    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_google.png"
    );

    message.channel.send(attachment);
  }
};
