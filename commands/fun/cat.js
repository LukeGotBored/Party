const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "randomcat",
  description: "Get a random cat picture!",
  guildOnly: false,
  aliases: ["cat", "getcat", "meow"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    try {
      const { link } = await fetch("https://some-random-api.ml/img/cat").then(
        response => response.json()
      );

      const catemb = new Discord.RichEmbed()
        .setTitle("Meow :cat:")
        .setColor(0xfeb637)
        .setImage(link)
        .setTimestamp()
        .setFooter("Party! x some-random-api.ml", "https://i.imgur.com/B6QKBgC.png");
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
