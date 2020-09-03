const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "nuke",
  description: "Nuke someone lol",
  guildOnly: false,
  aliases: ["explode"],

  execute(message, args) {
    var victim = "Nothing"
    if(args.length){
      victim = args.join(" ")
    }
    
    const member = message.guild.member(message.author);
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    const flipemb = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("Nuke sent!")
      .setDescription((member ? member.displayName : member.username)   + " just nuked **" + args.join(" ") + "!**")
      .setImage("https://i.pinimg.com/originals/6c/48/5e/6c485efad8b910e5289fc7968ea1d22f.gif")
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(flipemb);
  }
};


