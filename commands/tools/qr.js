const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "qr",
  description: "generate a qrcode!",
  guildOnly: false,
  aliases: ["qrcode"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
      
    
    if(!args.join(" ")){
        return message.channel.send(cross + " send me a picture or some text!")
      }

    
    try {
 
      
      
      var qrcode = "https://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(args.join(" ")) +  "&size=512x512&qzone=3&format=png&ec"

      const catemb = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor(0xfeb637)
        .setImage(qrcode)
        .setTimestamp()
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
      message.channel.send(catemb);
      
      
      
      
    } catch (error) {
      const errorEmbed = new Discord.RichEmbed()
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
