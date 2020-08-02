const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "randombird",
  description: "Get a random bird picture!",
  guildOnly: false,
  aliases: ["birb", "bird", "getbird", "getbirb", "getbird", "getbirb"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608").toString()
    const cross = message.client.emojis.get("655807081240330245").toString()
    try {
      const { link } = await fetch("https://some-random-api.ml/img/birb").then(
        response => response.json()
      );

      const birbemb = new Discord.MessageEmbed()
        .setTitle("here's a birb 🐦")
        .setColor(0xfeb637)
        .setImage(link)
        .setTimestamp()
        .setFooter(
          "Party! x some-random-api",
          "https://i.imgur.com/B6QKBgC.png"
        );
      message.channel.send(birbemb);
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
