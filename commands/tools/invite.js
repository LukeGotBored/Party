const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "want to invite party? here you go!",
  guildOnly: false,

  execute(message, args) {
    var server = message.guild;
    const debugEmbed = new Discord.MessageEmbed()
      .setThumbnail("https://i.imgur.com/t1P6d5P.gif")
      .setColor("0xfeb637")
      .setTitle("Invite Party to your server!")
      .addField("You can invite me here:" , "https://getparty.ml")
      .addField("Want to go beta?", "https://getparty.ml/beta")
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
      .setTimestamp();
    message.channel.send(debugEmbed);
  }
};
