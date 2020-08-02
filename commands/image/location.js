const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "location",
  description: "The FBI wants to know your location",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608").toString()
    const cross = message.client.emojis.get("655807081240330245").toString()
    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fwants%20to%20know%20your%20location.png?v=1581173651834"
    );
    var guy = args.join(" ")
    
    if(!args.join(" ")){
      guy = message.author.username
    }
    const text = guy + " wants to:";
    const paddingStart = 25;
    const paddingEnd = 70;
    
    const canvas = Canvas.createCanvas(overlay.width, overlay.height);
    const ctx = canvas.getContext("2d");
    ctx.font = "23px Arial";

    if (
      ctx.measureText(text).width + paddingStart >
      canvas.width - paddingEnd
    ) {
      return message.channel.send(cross + " That name is too long!");
    }

    ctx.fillStyle = "#FCFCFC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.65;
    ctx.fillStyle = "#000000";
    ctx.fillText(text, paddingStart, 45);
    ctx.globalAlpha = 1;

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      message.author.username + "_google.png"
    );

    message.channel.send(attachment);
  }
};
