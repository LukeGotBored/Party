const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "get some server stats!",
  aliases: ["serverstats", "members", "ss", "guild"],
  guildOnly: true,

  execute(message, args) {
    const guild = message.guild
    const ServerEmbed = new Discord.MessageEmbed()
      .setColor(0xfeb637)
      .setTitle("Here's the stats for " + guild.name)
      .addField("👥  member count: ", "**" + guild.memberCount + "**" + " members!")
      .addField("👑  server owner: ", guild.owner)
      .addField("🔌  server ID: ", guild.id)
      .addField("📅  creation date:", guild.createdAt)
      .addField("🤖  bot count:", "**" + guild.members.filter(member => member.user.bot).size + "**" + " Bot/s")
      .setThumbnail(guild.iconURL)
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
      .setTimestamp();
    message.channel.send(ServerEmbed);
  }
};
