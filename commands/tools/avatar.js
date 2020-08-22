const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "grab someone's avatar!",
  aliases: ["icon", "pfp", "getavatar", "getpfp", "av"],
  execute(message, args) {
    var mentionedUser = message.mentions.users.first();
    const user = message.client.util.getUser(message, args.join(" "));
    const server = message.client;
    args = args.filter(arg => !Discord.MessageMentions.USERS_PATTERN.test(arg));

    
    
      const avatarEmbed = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setTitle(user.username + "'s Avatar")
        .setImage(user.displayAvatarURL({size: 2048, format: "png"}))
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
      message.channel.send(avatarEmbed);
  }
};
