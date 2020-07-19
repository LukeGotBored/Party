const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "minecraft",
  description: "Do I even have to explain what this command does?",
  guildOnly: false,
  aliases: ["mc"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    try {
      const uuidresponse = await fetch("https://api.mojang.com/users/profiles/minecraft/" + args.join(" ")).then(
        response => response.json()
      );
      
      
      
      
      const uuid = uuidresponse.id

      const foxemb = new Discord.RichEmbed()
        .setTitle("Here's " + uuidresponse.name + "'s Minecraft Profile")
        .setColor(0xfeb637)
        .addField("UUID:", uuid, true)
        .setImage("https://minotar.net/skin/" + uuidresponse.id)
        .setThumbnail("https://minotar.net/helm/" + uuidresponse.id + "/100.png")
        .setTimestamp()
        .setFooter("Party! x Minecraft", "https://i.imgur.com/B6QKBgC.png");
      message.channel.send(foxemb);
    } catch (error) {
      const errorEmbed = new Discord.RichEmbed()
        .setColor(0xfeb637)
        .setTitle(cross + " Couldn't find the user!")
        .setDescription("Check if you typed the right username!")
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
        .setTimestamp();
      message.channel.send(errorEmbed);
    }
  }
};




//  GET https://sessionserver.mojang.com/session/minecraft/profile/<uuid> 
//  skin + cape