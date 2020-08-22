const Discord = require("discord.js");
const fetch = require("node-fetch");
const hastebin = require("hastebin-gen");


module.exports = {
  name: "qr",
  description: "generate a qrcode!",
  guildOnly: false,
  aliases: ["qrcode"],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
      
    
    if(!args.join(" ")){
        return message.channel.send(cross + " send me a picture or some text!")
      }

    
    try {
 
      
      
      var qrcode = "https://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(args.join(" ")) +  "&size=512x512&qzone=3&format=png&ec"
      const haste = await hastebin(args.join(" "), { extension: "txt" });
      const catemb = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription("[_can't scan? click here!_]("+ haste + ")")
        .setColor(0xfeb637)
        .setImage(qrcode)
        .setTimestamp()
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
      message.channel.send(catemb);
      
      
      
      
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
