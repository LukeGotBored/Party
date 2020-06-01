const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "randomfox",
  description: "Get some cute foxes",
  guildOnly: false,
  aliases: ["fox", "getfox", "cutefox", "foxpic"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    try {
      const { image } = await fetch("https://randomfox.ca/floof/").then(
        response => response.json()
      );

      const foxemb = new Discord.RichEmbed()
        .setTitle("Here's a cute fox 🦊")
        .setColor(0xfeb637)
        .setImage(image)
        .setTimestamp()
        .setFooter("Party! x randomfox.ca", "https://i.imgur.com/B6QKBgC.png");
      message.channel.send(foxemb);
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
