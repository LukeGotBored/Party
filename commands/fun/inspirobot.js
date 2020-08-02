const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "inspiro",
  description: "Here's some inspiration!",
  guildOnly: false,
  cooldown: 2,
  aliases: ["inspirobot"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608").toString();
    const cross = message.client.emojis.get("655807081240330245").toString();
    
    const response = "https://inspirobot.me/api?generate=true"
    const link = await fetch(response).then(res => res.text())
    
    const inspemb = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setTitle("AI Generated Quote!")
        .setImage(link)
        .setTimestamp()
        .setFooter(
          "Party! x Inspirobot",
          "https://i.imgur.com/B6QKBgC.png"
        );
    message.channel.send(inspemb);
    

  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Body/text

//https://inspirobot.me/api?generate=true