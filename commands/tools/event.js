const Discord = require("discord.js");

module.exports = {
  name: "event",
  description: "{str_description_evn}",
  guildOnly: false,
  developerOnly: true,
  aliases: ["announce"],

  execute(message, args) {
    
    var finalMessage = args.join(" ")
    finalMessage = finalMessage.replace("_news", "<:news:658522693058166804>")
    message.delete(700)
    var server = message.guild;
    const debugEmbed = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("Event!")
      .setDescription(finalMessage)
      .setImage(message.attachments ? message.attachments.array()[0].url : "none")
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
      .setTimestamp();
    console.log(debugEmbed)
    message.channel.send(debugEmbed);
  }
};
