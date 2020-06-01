const Discord = require("discord.js");
const fetch = require("node-fetch");
const querystring = require("querystring");

module.exports = {
  name: "urban",
  description: "Get an explanation about literally anything",
  guildOnly: false,
  nsfwOnly: true,
  aliases: [
    "urbandictionary",
  ],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...`.trim() : str.trim();

    try {
      if (!args.length) {
        return message.channel.send(cross + " You need to supply a search term!");
      }

      const query = querystring.stringify({ term: args.join(" ") });

      const { list } = await fetch(
        `http://api.urbandictionary.com/v0/define?${query}`
      ).then(response => response.json());

      if (!list.length) {
        return message.channel.send(
          cross + ` No results found for **${args.join(" ")}**.`
        );
      }

      const [answer] = list;

      const embed = new Discord.RichEmbed()
        .setColor(0xfeb637)
        .setTitle("**" + answer.word + "**")
        .setURL(answer.permalink)
        .addField("Definition", trim(answer.definition, 512))
        .addField("Example", trim(answer.example, 512))
        .addField(
          "Rating:",
          `${answer.thumbs_up} :+1:     ${answer.thumbs_down} :-1:`
        )
        .setFooter(
          "Party! x Urban Dictionary",
          "https://i.imgur.com/B6QKBgC.png"
        )
        .setTimestamp();

      message.channel.send(embed);
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
