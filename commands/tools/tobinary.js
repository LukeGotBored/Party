const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "tobinary",
  description: "convert stuff to binary",
  guildOnly: false,
  aliases: ["convert", "01", "10", "base2"],

  execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    var joinedargs = args.join(" ")
    var binary = ""
    
    if (args == "") {
      return message.channel.send(cross + " You haven't provided anything!")
    }
    
    if(joinedargs.length > 100){
      return message.channel.send(cross + " the message is too long! (max 100 chars)")
    }
    
    for (var i = 0; i < joinedargs.length; i++) {
      binary += joinedargs[i].charCodeAt(0).toString(2) + " ";
    }
     
  
    const flipemb = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("Beep Boop")
      .addField("📥 Input:", joinedargs)
      .addField("📤 Output:", binary)
      .setTimestamp()
      .setFooter("unicode | Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(flipemb);
  }
};
