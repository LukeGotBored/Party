const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "nuke",
  description: "Get free nitro 100% legit no scam no virus",
  guildOnly: false,
  aliases: ["explode"],

  execute(message, args) {
    const member = message.guild.member(message.author);
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    const flipemb = new Discord.RichEmbed()
      .setColor("0xfeb637")
      .setTitle("Nuke sent!")
      .setDescription((member ? member.displayName : member.username)   + " just nuked **" + args.join(" ") + "!**")
      .setImage("https://i.pinimg.com/originals/6c/48/5e/6c485efad8b910e5289fc7968ea1d22f.gif")
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(flipemb);
  }
};


