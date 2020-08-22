const Discord = require("discord.js");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = {
  name: "waifu",
  description: "Get a random waifu!",
  aliases: [],
  guildOnly: true,

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    try {
      const response = await fetch(
        "https://mywaifulist.moe/random"
      ).then(res => res.text());
      
      const $ = cheerio.load(response);
      
      const getMeta = (property) =>
        $(`meta[property="${property}"]`).attr("content")
      
      const image = getMeta("og:image")
      const name = getMeta("og:title")
      let description = getMeta("og:description")
      if (description.length === 150) description += "..."
      const url = getMeta("og:url")
      const embed = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setTitle(name)
        .setURL(url)
        .setThumbnail(image)
        .setDescription(description)
        .setFooter("Party! x MyWaifuList", "https://i.imgur.com/B6QKBgC.png");
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
        .setFooter("Party! x MyWaifuList", "https://i.imgur.com/B6QKBgC.png")
        .setTimestamp();
      message.reply(errorEmbed);
    }
  }
};
