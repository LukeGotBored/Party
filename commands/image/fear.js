const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "fear",
  description: "I fear no man, but that thing... \n*it scares me.*",
  guildOnly: false,
  aliases: ["thing", "tf2", "pyro"],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    
    const overlay = await Canvas.loadImage("https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fthing_overlay.png?v=1586731203798");
    const avatar = await Canvas.loadImage(user.displayAvatarURL({size: 1024, format: "png"}));

    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 172, 345, 170, 170);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_thing.png"
    );

    message.channel.send(attachment);
  }
};
