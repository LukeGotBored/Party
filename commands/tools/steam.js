const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "steam",
  description: "Get the summary of a steam user",
  guildOnly: false,
  aliases: ["steamuser"],
  cooldown: 5,

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    
        
    const users = "" 
    const erremb = new Discord.MessageEmbed()
        .setColor("#F04947")
        .setTitle(cross + " I couldn't find that user!")
        .setDescription("Please check again the SteamID you provided \n_(can't find your steamID? find it [here](https://steamid.xyz/))_")
        .setTimestamp()
        .setFooter(
          "Party! x Steam",
          "https://i.imgur.com/B6QKBgC.png"
        );    
    
    try {
      
     if(!args.length){
       return message.channel.send(erremb)
     }
      
      const response = await fetch(
        "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=" + process.env.STEAMKEY + "&format=json&steamids=" + encodeURI(args.join(" ")) 
      ).then(response => response.json());
      console.log(response.response);
      if(!response.response.players[0]){
        return message.channel.send(erremb)
      }
      
      
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const pad = string => string.toString().padStart(2, "0");
      const date = new Date(response.response.players[0].timecreated * 1000)
      const creationDay = `${weekdays[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      const creationTime = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      
      
      const lDate = new Date(response.response.players[0].lastlogoff * 1000)
      const loginDay = `${weekdays[lDate.getDay()]} ${lDate.getMonth() + 1}/${lDate.getDate()}/${lDate.getFullYear()}`;
      const loginTime = `${pad(lDate.getHours())}:${pad(lDate.getMinutes())}:${pad(lDate.getSeconds())}`;
      
      
      const creationDate = response.response.players[0].timecreated ? `${creationDay} ${creationTime}` : "Unknown "
      const realName = response.response.players[0].realname ? response.response.players[0].realname : "Unknown"
      const country = response.response.players[0].loccountrycode ? response.response.players[0].loccountrycode : "Unknown" 
      const lastLogin = response.response.players[0].lastlogoff ? `${loginDay} ${loginTime}` : "Unknown "
     
      const dogemb = new Discord.MessageEmbed()
        .setColor("#0xfeb637")
        .setTitle(response.response.players[0].personaname)
        .setURL(response.response.players[0].profileurl)
        .setThumbnail(response.response.players[0].avatarfull)
        .addField("👤 Real name:", realName , true)
        .addField("🌎 Country:", country , true)
        .addField("✏ Account Created:", creationDate)
        .setTimestamp()
        .setFooter(
          "Party! x Steam",
          "https://i.imgur.com/B6QKBgC.png"
        );
      
      
 

      dogemb
        .addField("🔑 Last Login:", lastLogin)
        .addField("#️⃣ Steam ID:", response.response.players[0].steamid, true)
      
      message.channel.send(dogemb);
    } catch (error) {
      const errorEmbed = new Discord.MessageEmbed()
        .setColor("#F04947")
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
