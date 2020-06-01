const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "8ball",
  description: "Predict the future!",
  guildOnly: false,
  aliases: ["future", "predict", "8b"],

  execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    var prediction = "none";
    var fortunes = [
      "As far as I can see, yes.",
      "It's certain.",
      "It's definitely like that.",
      "Most likely.",
      "Prospects are good.",
      "Signs indicate yes.",
      "Without a doubt.",
      "Yes.",
      "Yes, without a doubt.",
      "You can count on it.",
      "Don't count on it.",
      "My answer is no.",
      "My sources say no.",
      "prospects are not good.",
      "Very uncertain.",
      "I see it as difficult...",
      "Don't hope too much for it.",
      "Nope"
    ];
    prediction = fortunes[Math.floor(Math.random() * fortunes.length)];

    let predemb;

    if (!args.length) {
      predemb = new Discord.RichEmbed()
        .setColor("0xff0000")
        .setTitle(cross + " You haven't specified the question!")
        .addField(
          "You are supposed to use it like this: ",
          "*p!8ball will I ever be the best cook ever?*"
        )
        .setTimestamp()
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    } else {
      predemb = new Discord.RichEmbed()
        .setColor("0xfeb637")
        .setTitle(":8ball: Here's the prediction!")
        .addField(":sparkles: the ball says...", prediction)
        .setTimestamp()
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    }
    message.channel.send(predemb);
  }
};
