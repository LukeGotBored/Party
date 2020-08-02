const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "achievement",
  description: "Achievement get",
  guildOnly: false,
  aliases: ["coinflip", "coin", "flipacoin", "c", "cf"],

  execute(message, args) {
    var joinedargs = args.join(" ")
    
    
    
    
    
    // if no args provided  
    if(!joinedargs){
      
    const flipemb = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("Achievement Get!")
      .setDescription("say what you want to achieve!a\n(_p!achievement learning stuff!_)")
      .setImage("https://minecraftskinstealer.com/achievement/" + Math.floor(Math.random() * 40) + 1  + "/Achievement+Get%21/learning+stuff%21")
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    return message.channel.send(flipemb);
      
      
      
    }
    
    
    
    
    
    
    
    var url = "https://minecraftskinstealer.com/achievement/" + Math.floor(Math.random() * 39) + 1  + "/Achievement+Get%21/" + encodeURIComponent(joinedargs)

    const flipemb = new Discord.RichEmbed()
      .setColor("0xfeb637")
      .setTitle("Achievement Get!")
      .setDescription(joinedargs)
      .setImage(url)
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(flipemb);
  }
};
  