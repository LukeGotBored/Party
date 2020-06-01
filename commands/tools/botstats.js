  const Discord = require("discord.js");
const { version } = require("../../core/config.json");

module.exports = {
  name: "botstat",
  description: "gives the bot status!",
  aliases: ["stat", "info", "ping", "s", "stats", "botstats", "about"],

  execute(message, args) {
    
    message.client.fetchUser("305771483865546752").then(luke => { 
    const botstat = "https://top.gg/api/widget/527625435128004628.png" + "?gen=" + Math.random().toString(36).substring(2, 6);
      
    const pingemb = new Discord.RichEmbed()
      .setImage(botstat)
      .setAuthor(luke.tag , luke.avatarURL)
      .setTitle("<:party:650339176545386532> Party!")
      .addField("get started with p!help", "** **")
      .setColor(0xfeb637)
      .setThumbnail(message.client.user.avatarURL)
      .addField("🏓 Ping:", Math.round(message.client.ping) + " ms!", true)
      .addField("🌐 Servers: ", message.client.guilds.size + " servers!", true)
      .addField("🕙 Uptime: ", (message.client.uptime/1000).toFixed(1) + "s", true)
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(pingemb);
    })
  }                                                  
};
