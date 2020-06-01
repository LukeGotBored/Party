const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "delete",
  description: "_Delet Dis_",
  guildOnly: false,
  aliases: ["delet"],

  async execute(message, args) {
    
       const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fdelet_overlay.png?v=1582038293382"
    );
    
    
    
    const canvas = Canvas.createCanvas(overlay.width, overlay.height);
    const ctx = canvas.getContext("2d");
    const user = message.client.util.getUser(message, args.join(" "));

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar, 120, 135, 195 , 195);

 
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_delete.png"
    );  

    message.channel.send(attachment);
  }
};
