const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "triggered",
  description: "*TRIGGERED*",
  aliases: ["trigger"],
  guildOnly: false,
  cooldown: 5,

  execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    const user =  message.client.util.getUser(message, args.join(" "));
    var joinargs = args.join(" ");
    
  
    var gencomment =
      "https://some-random-api.ml/canvas/triggered?avatar=" +
      user.displayAvatarURL({size: 1024, format: "png"})


    
    message.channel.send({
      files: [{ attachment: gencomment, name: "triggered.gif" }]
    });
  }
};
