const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "minecraft",
  description: "Do I even have to explain what this command does?",
  guildOnly: false,
  aliases: ["mc"],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    try {
      const uuidresponse = await fetch("https://api.mojang.com/users/profiles/minecraft/" + args.join(" ")).then(
        response => response.json()
      );
      
    if(!args.size){
      return message.channel.send(cross + " You need to provide a minecraft username!")
    }
      
      
      const uuid = uuidresponse.id

      const foxemb = new Discord.MessageEmbed()
        .setTitle("Here's " + uuidresponse.name + "'s Minecraft Profile")
        .setColor(0xfeb637)
        .addField("UUID:", uuid, true)
        .setImage("https://minotar.net/skin/" + uuidresponse.id)
        .setThumbnail("https://minotar.net/helm/" + uuidresponse.id + "/100.png")
        .setTimestamp()
        .setFooter("Party! x Minecraft", "https://i.imgur.com/B6QKBgC.png");
      message.channel.send(foxemb);
    } catch (error) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xfeb637)
        .setTitle(cross + " Couldn't find the user!")
        .setDescription("Check if you typed the right username!")
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
        .setTimestamp();
      message.channel.send(errorEmbed);
    }
  }
};

