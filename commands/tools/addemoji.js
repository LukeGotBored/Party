const Discord = require("discord.js");
const isImage = require('is-image');
const fs = require('fs')

module.exports = {
  name: "addemoji",
  description: "add emojis to your server, with ease!",
  aliases: ["addnewemoji", "newemoji", "ne"],
  guildonly: true,
  
  async execute(message, args) {
    
    var name = args.join(" ");
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    
    
    
   
    
    
    
    
    
    if(!message.attachments.array()[0]){
      return message.channel.send(cross + " **" + message.author.username + "**, please attach an image to the message!")
    }
    
    if(!args[0]){
      return message.channel.send(cross + " **" + message.author.username + "**, please tell me how you would like to call this emoji!")
    }
    
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
      return message.channel.send(cross + " **" + message.author.username + "**, you don't have the `MANAGE_EMOJIS` permission!")
    }
    if(!message.member.guild.me.hasPermission("MANAGE_EMOJIS")){
      return message.channel.send(cross + " **" + message.author.username + "**, I don't have the `MANAGE_EMOJIS` permission!")
    }
    
    if(!isImage(message.attachments.array()[0].url)){
      return message.channel.send(cross + " **" + message.author.username + "** , that's not an image! please upload an image format!")
    }
    
    
    name = name.replace(/[^\w-_]/g, "").trim().replace(/ /g, "_")
    
    if(name.length < 2 || name.length > 32){
      return message.channel.send(cross + " **" + message.author.username + "** , the name must be between 2 and 32 characters!\n> (also keep in mind that you can't use special caracters such as `@, !, *`)")
    }
    

        
      message.guild.createEmoji(message.attachments.array()[0].url, name.toString())
        .then(emoji => message.channel.send(tick +" Done! Here's **" + emoji.name + "** " + message.client.emojis.get(emoji.id)))
          .catch(console.error);

  }
};
