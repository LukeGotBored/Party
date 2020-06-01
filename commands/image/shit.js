const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "shit",
  description: "ew",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(595, 835);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fshit_layer1.png?v=1580919428753"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.globalAlpha = 0.7;
    ctx.rotate((35 * Math.PI) / 180); // 35 degrees to radians
    ctx.drawImage(avatar, 500, 270, 150, 150);

    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fshit_layer2.png?v=1580919429252"
    );
    ctx.rotate((-35 * Math.PI) / 180);
    ctx.globalAlpha = 1;
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_shit.png"
    );

    message.channel.send(attachment);
  }
};
