const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "coinflip",
  description: "Flip-a-coin",
  guildOnly: false,
  aliases: ["coinflip", "coin", "flipacoin", "c", "cf", "flip"],

  execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    const rand = Math.random();
    let side;
    if (rand < 0.5) side = "😃  **Heads!**";
    else if(rand > 0.5 && rand < 0.9){ side = "🦊  **Tails!**";}
    else(side = cross + " Sorry! I lost the coin, try again!")
    
    const flipemb = new Discord.RichEmbed()
      .setColor("0xfeb637")
      .setTitle("Coin Flipped!")
      .addField("it landed on...", side)
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(flipemb);
  }
};
