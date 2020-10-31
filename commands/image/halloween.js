const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "halloween",
  description: "Make any image spooky!",
  guildOnly: false,
  aliases: ["spookify"],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    
    const avatar = await Canvas.loadImage(user.displayAvatarURL({format: 'png', size: 1024}));
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2Fspook.png?v=1604143530215"
    );
    ctx.globalAlpha = 0.7;
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_halloween.png"
    );

    message.channel.send(attachment);
  }
};
