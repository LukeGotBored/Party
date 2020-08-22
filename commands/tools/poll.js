const Discord = require("discord.js");
const fetch = require("node-fetch");
const emojiCharacters = require('../../utils/emojiCharacters.js');

module.exports = {
  name: "poll",
  description: "Poll Beta",
  guildOnly: false,
  aliases: [],
  cooldown: 5,

  execute(message, args) {
    var author = message.author.tag
    var text;
    var amount;
    var collec = args.join(" ").split(",");
    
    
    if (collec.length <= 1) {
      amount = 2
      text = collec.join(" ")
      text = text.replace(/,/g, ' ');
      message.channel.send("tip: you can also say the number of options (like this: p!poll 2, pizza or sushi?)")
    } else if (collec.length >= 1){
      amount = collec[0]
      collec = collec.slice(1)
      text = collec.join(" ")
      text = text.replace(/,/g, ' ');
    }
    
    if(amount > 10){
      return message.channel.send("Looks like you got too many options there! the max is **10**!")
    }

    const topicemb = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("👥 Poll by " + author)
      .setDescription(text)
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(topicemb)
        .then(function (message) {
            
            
            
            for (var i = 0; i < amount; i++) {
              message.react(emojiCharacters[i+1])
            }
    });
  }
};
