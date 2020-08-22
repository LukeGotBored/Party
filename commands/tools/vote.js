const Discord = require("discord.js");

module.exports = {
  name: "vote",
  description: "Support the developement of Party!",
  guildOnly: false,
  aliases: ["donate"],
  

  execute(message, args) {
    const voteemb = new Discord.MessageEmbed()
      .setTitle("Support Party's Development!")
      .addField("Vote!", "** **")
      .addField(
        "top.gg",
        "[Vote!](https://top.gg/bot/527625435128004628/vote)",
        true,
      )
      .addField(
          "Bots for discord",
          "[Vote!](https://botsfordiscord.com/bot/527625435128004628/vote)",
          true,
      )
      .addField(
          "Botlist.space",
          "[Vote!](https://botlist.space/bot/527625435128004628/upvote)",
          true,
      )
      
      .addField("Donate!", "Not Available", true)
      .setColor(0xfeb637)
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
      .setImage(
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fparty.gif?v=1587305080543",
        true
      );
    message.channel.send(voteemb);
  }
};
