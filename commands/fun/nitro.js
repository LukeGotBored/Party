const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "nitro",
  description: "Get free nitro 100% legit no scam no virus",
  guildOnly: false,
  aliases: ["freenitro", "getnitro"],

  execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    const flipemb = new Discord.RichEmbed()
      .setColor("0xfeb637")
      .setTitle("Free Nitro")
      .setDescription("Click this link to get [free nitro](https://www.youtube.com/watch?v=dQw4w9WgXcQ)")
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(flipemb);
  }
};



// to be removed
