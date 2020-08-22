const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "frombinary",
  description: "convert binary to stuff",
  guildOnly: false,
  aliases: ["totext"],

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
    
  
      binary = joinedargs.split(' ') //Split string in array of binary chars
                   .map(bin => String.fromCharCode(parseInt(bin, 2))) //Map every binary char to real char
                      .join('');
    
     
  
    const flipemb = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("Beep Boop")
      .addField("📥 Input:", joinedargs)
      .addField("📤 Output:", binary)
      .setTimestamp()
      .setFooter("Keep in mind that this is unicode | Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(flipemb);
  }
};
  