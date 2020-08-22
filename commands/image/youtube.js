const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "youtube",
  description: "Generate a fake youtube comment!",
  aliases: ["comment", "fy", "fc", "fakecomment", "fakeyt", "youtube"],
  guildOnly: false,

  execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    const user = message.author
    var joinargs = args.join(" ");
    
    if (!joinargs) {
      message.channel.send(cross + " tell me what you want to comment!");
      return;
    }
  
    var gencomment =
      "https://some-random-api.ml/canvas/youtube-comment?username=" +
      user.username.trim().slice(0, 25) +
      "&comment=" +
      encodeURIComponent(joinargs) +
      "&avatar=" +
      user.displayAvatarURL({size: 1024, format: "png"}) +
      "&dark=true";

    if (joinargs.length > 75) {
      message.channel.send(cross + " Too long! 75 characters is the limit!");
      return;
    }
    
    message.channel.send({
      files: [{ attachment: gencomment, name: "comment.png" }]
    });
  }
};
