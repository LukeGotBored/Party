const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "lyrics",
  description: "a new way of singing under the shower!",
  guildOnly: false,
  aliases: ["songlyrics", "fetchlyrics"],
  cooldown: 7,

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    try {
      const response = await fetch(
        "https://some-random-api.ml/lyrics?title=" + encodeURIComponent(args.join(" "))
      ).then(response => response.json());
      
      
      if(response.error){
        return message.channel.send(cross + " " + response.error)
      }
      
      
      
      const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...\n\n _Want the full lyrics? Click [here!](${response.links.genius})_`.trim() : str.trim();
      
      const dogemb = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setTitle(response.title + " by " + response.author)
        .setURL(response.links.genius)
        .setThumbnail(response.thumbnail.genius)
        .setDescription(trim(response.lyrics, 1900))
        .setTimestamp()
        .setFooter(
          "Party! x genius",
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
