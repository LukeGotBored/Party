const Discord = require("discord.js");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = {
  name: "waifuai",
  description: "Get a random AI-generated waifu",
  aliases: ["aiwaifu"],
  guildOnly: true,

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    try {
      const randNum = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000
      const image = "https://www.thiswaifudoesnotexist.net/example-" + randNum + ".jpg"  
      const embed = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setTitle("here's " + message.author.username + "'s waifu!")
        .setDescription("⚠️ Keep in mind that this is ai-generated content, it may look weird!")
        .setImage(image)
        .setFooter("Party! x ThisWaifuDoesNotExist.net", "https://i.imgur.com/B6QKBgC.png");
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
