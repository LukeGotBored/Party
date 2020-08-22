const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");
const { parse } = require("twemoji-parser");

module.exports = {
  name: "emoji",
  description: "It's basically a magnifier",
  guildOnly: false,
  aliases: ["getemoji", "grabemoji", "stealemoji"],

  async execute(message, args) {
    
    const cross = message.client.emojis.cache.get("655807081240330245").toString()

    // try to parse default emoji
    let emoji = message.client.util.parseEmoji(args.join(" ")).url;
    // didn't work, try parsing custom emoji
    let customEmoji;
    if (!emoji) customEmoji = (parse(args.join(" "))[0] || {}).url;
    
    let emojiemb = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setTitle("Here's the emoji")
        .setTimestamp()
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");

    if (emoji) {
      message.channel.send(emojiemb
        .setImage(emoji)
        .setDescription(`[Download!](${emoji})`)
      );
    } else if (customEmoji) {
      
        const emoji = await Canvas.loadImage(customEmoji);
        emoji.width = emoji.height = 144
        const canvas = Canvas.createCanvas(144, 144);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(emoji, 0, 0, 144, 144);
        message.channel.send(emojiemb
          .setDescription(`[Download](${customEmoji})`)
          .attachFiles({ attachment: canvas.toBuffer(), name: "emoji.png" })
          .setImage("attachment://emoji.png")
        )

    } else {
      return message.channel.send(cross + " That's not an emoji!");
    }
  }
};
