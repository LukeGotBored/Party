const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "neat",
  description: "that's some neat stuff",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "))

    const canvas = Canvas.createCanvas(960, 576);
    const ctx = canvas.getContext("2d");

    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    const BottomOverlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FBoverlay_neat.png?v=1586786408880"
    );
    const TopOverlay = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FToverlay_neat.png?v=1586786408196"
    );
    
  
    ctx.drawImage(BottomOverlay, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatar, 145, 300, 190, 190);
    ctx.drawImage(TopOverlay, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.Attachment(canvas.toBuffer(), user.username + "_neat.png");

    message.channel.send(attachment);
  }
};