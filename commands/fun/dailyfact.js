const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "dailyfact",
  description: "Daily facts!",
  guildOnly: false,
  aliases: ["fact", "randomfact"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    try {
      const res = await fetch("https://uselessfacts.jsph.pl/today.json?language=en").then(
        response => response.json()
      );

      const catemb = new Discord.RichEmbed()
        .setTitle("📚 Daily Fact")
        .setColor(0xfeb637)
        .setDescription(res.text)
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/248/thinking-face_1f914.png")
        .addField( "Infos:", "Source: " + res.source  + "\n[Share this fact](" + res.permalink + ")" )
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
