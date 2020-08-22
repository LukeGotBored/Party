const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "disgusting",
  description: "guys just want one thing... and it's your image :>",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const canvas = Canvas.createCanvas(512, 683);
    const ctx = canvas.getContext("2d");
    const user = message.client.util.getUser(message, args.join(" "));

    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(user.displayAvatarURL({size: 1024, format: 'png'}));
    ctx.drawImage(avatar, 0, 250, 519, 500);

    const foreground = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FE644684B-AB51-4F69-9230-0E388678E5B8.png?v=1581027941334"
    );
    ctx.drawImage(foreground, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_disgusting.png"
    );

    message.channel.send(attachment);
  }
};
