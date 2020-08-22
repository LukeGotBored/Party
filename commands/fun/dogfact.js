const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "dogfact",
  description: "Get a random dog fact",
  guildOnly: false,
  aliases: ["dogfacts"],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    try {
      const response = await fetch(
        "https://some-random-api.ml/facts/dog"
      ).then(response => response.json());
      
      const dogemb = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setTitle("Did you know? 🐶")
        .setDescription("_" + response.fact + "_")
        .setTimestamp()
        .setFooter(
          "Party! x some-random-api",
          "https://i.imgur.com/B6QKBgC.png"
        );
      message.channel.send(dogemb);
    } catch (error) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle(cross +" Uh Oh! there was an error!")
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
