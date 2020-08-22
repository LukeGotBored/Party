const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "randomcolor",
  description: "green is not a creative color",
  guildOnly: false,
  aliases: ["color", "randcolor", "randcol"],

  execute(message, args) {
    const randValue = () =>
      Math.floor(Math.random() * 255)
        .toString(16)
        .padStart(2, "0")
        .toUpperCase();

    const color = `#${randValue()}${randValue()}${randValue()}`;
   
    const canvas = Canvas.createCanvas(64, 64);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 64, 64)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "color.png");
    
    const coloremb = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("Here's your random color!")
      .setDescription(color)
      .setThumbnail("attachment://color.png")
      .setTimestamp()
      .attachFiles(attachment)
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(coloremb)
  }
};
