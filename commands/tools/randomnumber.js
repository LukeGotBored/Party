const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "randomnumber",
  description: "Get a random number from random.org, you can choose the min, the max and the amount of numbers!",
  guildOnly: false,
  aliases: ["lottery", "extractnumber", "random"],

  async execute(message, args) {
      const tick = message.client.emojis.get("655807079784644608");
      const cross = message.client.emojis.get("655807081240330245");
      

      var min = 0
      var max = 100000
      var size = 1
    
    
      if(args[0]){
        min = args[0]
      }
    
      if(args[1]){
        max = args[1]
      }
    
      if(args[2]){
        size = args[2]
      }


    
    const response = "https://www.random.org/integers/?num=" + size + "&min=" + min + "&max=" + max + "&col=1&base=10&format=plain&rnd=new"
    var   rand = await fetch(response).then(res => res.text())
    
    
    
    rand = rand.replace(/\r?\n|\r/g, " ");
    const flipemb = new Discord.RichEmbed()
      .setColor("0xfeb637")
      .setTitle("🔢 Random Number Time!")
      .addField("the extracted number is...", rand)
      .setTimestamp()
      .setFooter("Party! * random.org", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(flipemb);
  }
};
