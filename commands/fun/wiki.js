const Discord = require("discord.js");
const fetch = require("node-fetch");
const cheerio = require("cheerio")
const striptags = require('striptags');


module.exports = {
  name: "wiki",
  description: "Get an explanation about literally anything",
  guildOnly: false,
  aliases: [
    "wikipedia",
    "def",
    "define",
    "dictionary"
  ],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...`.trim() : str.trim();

    try {
      if (!args.length) {
        return message.channel.send(cross + " You need to supply a search term!");
      }

      const query = args.join(" ")

      const searchBody = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`).then((res) => res.json());

      if (searchBody.query.search.length === 0)
        return message.channel.send(cross + " Couldn't find anything!")
      const article = searchBody.query.search[0]
      
      const articleURL = `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title.replace(/ /g, "_"))}?curid=${article.pageid}`;
      const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...`.trim() : str.trim();

      const infoBody = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${article.pageid}`).then((res) => res.json());
      if (Object.keys(infoBody.query.pages).length < 1)
        throw new Error("")
      const snippet = Object.values(infoBody.query.pages)[0].extract
      
      const embed = new Discord.MessageEmbed()
        .setURL(articleURL)
        .setTitle(article.title)
        .setDescription(trim(striptags(snippet), 200) + ` [Read more](${articleURL})`)
        .setColor(0xf4b342)
        .setThumbnail("https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2F0fa7018c-e43a-45ed-8f08-f152a2c51923.image.png?v=1588017684714")
        .setFooter("Party! x Wikipedia", "https://i.imgur.com/B6QKBgC.png")
        .setTimestamp();

      message.channel.send(embed);
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
