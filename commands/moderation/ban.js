const Discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "🔨",
  guildOnly: true,
  aliases: ["banhammer", "destroy", "disintegrate"],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    
    let banned = message.mentions.users.first() || message.client.users.resolve(args[0]);
    let reason = args.slice(1).join(" ") + " | banned by " + message.author.username;
    
    
        if (message.author === banned) {
      let sanctionyourselfembed = new Discord.MessageEmbed()
        .setDescription(`${cross} You cannot ban yourself!`)
        .setColor("#ff0000");
      message.channel.send(sanctionyourselfembed);
  
      return;
    }
  
    if (!reason) {
      let noreasonembed = new Discord.MessageEmbed()
        reason = "not specified | banned by " + message.author.username
    }
  
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      let nopermsembed = new Discord.MessageEmbed()
        .setDescription(
          cross + " You do not have permission `BAN MEMBERS` contact an administrator"
        )
        .setColor("ff0000");
      message.channel.send(nopermsembed);
  
      return;
    }
  
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      let botnopermsembed = new Discord.MessageEmbed()
        .setDescription(
          cross + " I do not have `BAN MEMBERS` permission"
        )
        .setColor("#ff0000");
      message.channel.send(botnopermsembed);
  
      return;
    }
  
    
    if(!message.guild.member(banned.id).bannable){
      let usermodembed = new Discord.MessageEmbed()
        .setDescription(
          cross + " I can't ban a moderator!"
        )
        .setColor("#ff0000");
      message.channel.send(usermodembed);
  
      return;
    }

    
    
    message.guild.members.ban(banned, { reason: reason });
  
    let successfullyembed = new Discord.MessageEmbed()
       .setColor("0xfeb637")
       .setAuthor("Banned by " + message.author.username , message.author.displayAvatarURL({type: "png", size: 1024}))
       .setTitle(`${tick} ${banned.tag} has been banned!`)
       .setThumbnail(banned.displayAvatarURL({type: "png", size: 1024}))
       .addField("Reason:", reason, true)
       .setTimestamp()
       .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
  
    message.channel.send(successfullyembed);
 
    
    
    
    
    
    
  const banEmb = new Discord.MessageEmbed()
       
  }
};
