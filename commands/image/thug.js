const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "thug",
  description: "what is this 2012?",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "))
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const avatar = await Canvas.loadImage(user.displayAvatarURL({format: 'png', size: 1024}));
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2Fthug_overlay.png?v=1600287355015"
    );
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), user.username + "_brazzers.png");

    message.channel.send(attachment);
  }
};

