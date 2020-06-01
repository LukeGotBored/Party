const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "wallrip",
  description: "what are you hiding in there?!",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";

    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar, 120, 170, 370, 370);

    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fwallrip_overlay.png?v=1580829896883"
    );
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    // Buffer the image and send the file as an attachment
    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_wallrip.png"
    );

    message.channel.send(attachment);
  }
};
