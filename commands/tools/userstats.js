const Discord = require("discord.js");
var status = "none";

module.exports = {
  name: "userinfo",
  description: "get some stats!",
  aliases: ["userstats", "userinfo", "user-info", "profile", "us"],
  guildOnly: false,

  async execute(message, args) {
    var mentionedUser = message.mentions.users.first();
    const user = message.client.util.getUser(message, args.join(" "));
    const server = message.client;


    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const pad = string => string.toString().padStart(2, "0");
    const date = user.createdAt;
    const creationDay = `${weekdays[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const creationTime = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    

    
    var username = user.username
    
    if(user.bot){
      username += " <:bot:686533672119042056>"
    }
    
    var presence = "Error"  
    
    if(!user.presence.game){
      presence = "Nothing!"
    }
    
    else if(user.presence.game.state){
      presence = user.presence.game.state
    }
    
    else{
      presence = user.presence.game.name
    }
    
 
      const UserEmbed = new Discord.MessageEmbed()

        .setColor(0xfeb637)
        .setTitle("Here are the stats for " + username)
        .setThumbnail(user.displayAvatarURL)
        .addField("📅 Account Created: ", `${creationDay} ${creationTime} GMT+0`, true)
        .addField("#️⃣ Tag: ", user.tag, true)
        .addField("🆔 ID:", user.id, true)
        .addField("🎮 Activity: ", presence, true)
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
        .setTimestamp();

      message.channel.send(UserEmbed);
  }
}
