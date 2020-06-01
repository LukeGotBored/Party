const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "joke",
  description: ":warning: Awful jokes",
  guildOnly: false,
  aliases: ["dadjokes", "jokes", "pun"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      ).then(response => response.json());
      const jokeemb = new Discord.RichEmbed()
        .setColor("0xfeb637")
        .setTitle("Here's a (bad) joke!")
        .addField(response.setup, response.punchline)
        .setTimestamp()
        .setFooter(
          "Party! x official-joke-api" +
            " | " +
            "type: " +
            response.type +
            " | " +
            "id: " +
            response.id,
          "https://i.imgur.com/B6QKBgC.png"
        );
      message.channel.send(jokeemb);
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
