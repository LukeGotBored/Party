const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "bobross",
  description: "there are no mistakes, just happy little accidents",
  guildOnly: false,
  aliases: ["paint"],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2F26A983F0-2F67-40EB-86A7-FC34A5C9DD3A.png?v=1581027526162"
    );
    const canvas = Canvas.createCanvas(overlay.width, overlay.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    ctx.drawImage(avatar, 36, 10, 340, 320);
    ctx.drawImage(overlay, 0, 0);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_bobross.png"
    );

    message.channel.send(attachment);
  }
};
