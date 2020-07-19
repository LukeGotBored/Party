const Discord = require("discord.js");

module.exports = {
  name: "announcement",
  description: "{str_description_ann}",
  guildOnly: false,
  developerOnly: true,
  aliases: ["announce"],

  execute(message, args) {
    
    var finalMessage = args.join(" ")
    finalMessage = finalMessage.replace("_news", "<:news:658522693058166804>")
    message.delete()
    var server = message.guild;
    const debugEmbed = new Discord.RichEmbed()
      .setColor("0xfeb637")
      .setTitle("Announcement!")
      .setDescription(finalMessage)
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
      .setTimestamp();
    message.channel.send(debugEmbed);
  }
};
