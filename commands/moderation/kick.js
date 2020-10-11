const Discord = require("discord.js");

module.exports = {
  name: "kick",
  description: "🔨",
  guildOnly: true,


  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    
    let kicked = message.mentions.users.first() || message.client.users.resolve(args[0]);
    let reason = args.slice(1).join(" ") + " | kicked by " + message.author.username
    
    
        if (message.author === kicked) {
      let sanctionyourselfembed = new Discord.MessageEmbed()
        .setDescription(`${cross} You cannot kick yourself!`)
        .setColor("#ff0000");
      message.channel.send(sanctionyourselfembed);
  
      return;
    }
  
    if (!reason) {
      let noreasonembed = new Discord.MessageEmbed()
        reason = "not specified | kicked by " + message.author.username
    }
  
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      let nopermsembed = new Discord.MessageEmbed()
        .setDescription(
          cross + " You do not have permission `KICK MEMBERS` contact an administrator"
        )
        .setColor("ff0000");
      message.channel.send(nopermsembed);
  
      return;
    }
  
    if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
      let botnopermsembed = new Discord.MessageEmbed()
        .setDescription(
          cross + " I do not have `KICK MEMBERS` permission"
        )
        .setColor("#ff0000");
      message.channel.send(botnopermsembed);
  
      return;
    }
  
    
    if(!message.guild.member(kicked.id).bannable){
      let usermodembed = new Discord.MessageEmbed()
        .setDescription(
          cross + " I can't kick a moderator!"
        )
        .setColor("#ff0000");
      message.channel.send(usermodembed);
  
      return;
    }

    
    
    message.guild.members.kick(kicked, { reason: reason });
  
    let successfullyembed = new Discord.MessageEmbed()
       .setColor("0xfeb637")
       .setAuthor("Kicked by " + message.author.username , message.author.displayAvatarURL({type: "png", size: 1024}))
       .setTitle(`${tick} ${kicked.tag} has been kicked!`)
       .setThumbnail(kicked.displayAvatarURL({type: "png", size: 1024}))
       .addField("Reason:", reason, true)
       .setTimestamp()
       .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
  
    message.channel.send(successfullyembed);
 
    
    
    
    
    
    
  const banEmb = new Discord.MessageEmbed()
       
  }
};
