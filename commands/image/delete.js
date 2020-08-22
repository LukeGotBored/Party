const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "delete",
  description: "_delet dis image_",
  guildOnly: false,
  aliases: ["delet"],

  async execute(message, args) {
    
       const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2Fdelet_overlay.png?v=1597505653835"
    );
    
    
    
    const canvas = Canvas.createCanvas(overlay.width, overlay.height);
    const ctx = canvas.getContext("2d");
    const user = message.client.util.getUser(message, args.join(" "));

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(user.displayAvatarURL({size: 1024, format: 'png'}));
    ctx.drawImage(avatar, 120, 135, 195 , 195);

 
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_delete.png"
    );  

    message.channel.send(attachment);
  }
};
