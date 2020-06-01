const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "communism",
  description: "add some communism to your life",
  guildOnly: false,
  aliases: ["ourpfp", "ouravatar"],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    
    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2F76D0620A-80D3-4713-A159-116C9535BF64.jpeg?v=1580809659666"
    );
    ctx.globalAlpha = 0.4;
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_comrade.png"
    );

    message.channel.send(attachment);
  }
};
