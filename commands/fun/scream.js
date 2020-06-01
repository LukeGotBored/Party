const Discord = require("discord.js");
const randomCase = require("random-case");

module.exports = {
  name: "scream",
  description: "Scream just like Karen",
  guildOnly: true,
  cooldown: 5,
  aliases: ["caps", "screaming", "karen"],


  
  
  
  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    
    if (!message.member.guild.me.hasPermission("MANAGE_WEBHOOKS")){
      return message.channel.send(cross + "I DON'T HAVE THE **Manage Webhooks** PERMISSION!")
    }

    const joinedArgs = args.join(" ");
    if (!joinedArgs)
      return message.channel.send(
        cross + " Tell me what you'd like to scream! (_p!scream i want to speak with the manager!_)"
      );
    const webhook = await message.channel.createWebhook(
      message.author.username,
      message.author.displayAvatarURL
    );
    const mentionHook = new Discord.WebhookClient(webhook.id, webhook.token);
    message.delete(50);
    const scream = randomCase(String(joinedArgs));
    mentionHook.send(scream, { "disableEveryone": true });
    mentionHook.delete("Expired - Party!");
  }
};
