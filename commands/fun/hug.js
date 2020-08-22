const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "hug",
  description: "Hug someone!",
  aliases: ["givehug"],
  guildOnly: true,

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString();
    const cross = message.client.emojis.cache.get("655807081240330245").toString();
    try {
      const response = await fetch("https://some-random-api.ml/animu/hug").then(
        response => response.json()
      );

      var author = message.author
      const user = message.client.util.getUser(message, args.join(" "));
      const server = message.client;

       if(author.username == user.username){
             author = "Party"
              } else {
             author = author.username
       }
              
     
      const avatarEmbed = new Discord.MessageEmbed()
          .setColor("0xfeb637")
          .setTitle(
            "❤️ " +  author + " hugged " + user.username + "!"
          )
          .setImage(response.link)
          .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
        message.channel.send(avatarEmbed);
      
    
    
    
    
    
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
