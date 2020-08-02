const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "chat",
  description: "Chat with Party!",
  aliases: ["talk", "ai"],
  guildOnly: false,

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608").toString()
    const cross = message.client.emojis.get("655807081240330245").toString()
    
    if(!args.join(" ")){
      return message.channel.send("Hey **" + message.author.username + "**, what would you like to talk about?")
    }
    
    try {
      const response = await fetch("http://api.brainshop.ai/get?bid=10487&key=unHpDZXSjH9CRYKK&uid=" + message.author.id + "&msg=" + encodeURIComponent(args.join(" ")))
        .then(res => res.json())
      
      var author = message.author
      const server = message.client;

      
      message.channel.send("to **" + message.author.username + "**: \n" + response.cnt);
    
    

    } catch (error) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(cross + " Uh Oh! there was an error!")
        .addField(
          "please contact the developer",
          "Join the support server [Here](https://discord.gg/7Wx3jVD)"
        )
        .setDescription(error)
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
        .setTimestamp();
      message.reply(errorEmbed);
    }
  }
};
