const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "randomfox",
  description: "Get some cute foxes",
  guildOnly: false,
  aliases: ["fox", "getfox", "cutefox", "foxpic"],
  cooldown: 5,  


  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    try {
      const { image } = await fetch("https://randomfox.ca/floof/").then(
        response => response.json()
      );

      const foxemb = new Discord.MessageEmbed()
        .setTitle("Here's a cute fox 🦊")
        .setColor(0xfeb637)
        .setImage(image)
        .setTimestamp()
        .setFooter("Party! x randomfox.ca", "https://i.imgur.com/B6QKBgC.png");
      message.channel.send(foxemb);
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
