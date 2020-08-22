const Discord = require("discord.js");

module.exports = {
  name: "clap",
  description: ":clap: meme :clap: review :clap:",
  guildOnly: true,
  cooldown: 5,
  aliases: [],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    



    var joinedArgs = args.join(" 👏 ");
    joinedArgs += " 👏"
    
    if (!message.member.guild.me.hasPermission("MANAGE_WEBHOOKS")){
      return message.channel.send(cross +" I 👏 don't 👏 have 👏 the 👏 **Manaage Webhooks** 👏 pewmission!")
    }  


    if (!joinedArgs)
      return message.channel.send(cross + "  👏 give 👏 me 👏 something 👏 to 👏 clap 👏 about");





    const webhook = await message.channel.createWebhook(message.member.displayName, {avatar: message.author.displayAvatarURL(), reason: 'Command ran by ' + message.author.tag});
    
    const mentionHook = new Discord.WebhookClient(webhook.id, webhook.token);
   
      await webhook.send(joinedArgs, {disableEveryone: true})
      webhook.delete("Expired - Party!").catch;

          
        
    
    message.delete({timeout: 50 });

    
  }
};
