const Discord = require("discord.js");

module.exports = {
  name: "notice",
  description: "{str_description_ntc}",
  guildOnly: false,
  developerOnly: true,
  aliases: ["announce"],

  execute(message, args) {
    
    var finalMessage = args.join(" ")
    finalMessage = finalMessage.replace("_news", "<:news:658522693058166804>")
    message.delete(700)
    var server = message.guild;
    const debugEmbed = new Discord.RichEmbed()
      .setColor("0xfeb637")
      .setTitle("Notice.")
      .setDescription(finalMessage)
      .setImage(message.attachments.array()[0] ? message.attachments.array()[0].url : "")
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
      .setTimestamp();
    console.log(debugEmbed)
    message.channel.send(debugEmbed);
  }
};
