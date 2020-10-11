const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "johnny",
  description: "HERE'S JOHNNY!",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(1600, 900);
    const ctx = canvas.getContext("2d");



    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png', size: 1024}));
    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2Fjohnny_overlay.png?v=1600285763077"
    );
    ctx.drawImage(avatar, 300, -100, 1024, 1024);
  
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
  
    

    
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_job.png"
    );

    message.channel.send(attachment);
  }
};
