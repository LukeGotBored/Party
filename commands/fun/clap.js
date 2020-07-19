const Discord = require("discord.js");

module.exports = {
  name: "clap",
  description: ":clap: meme :clap: review :clap:",
  guildOnly: true,
  cooldown: 5,
  aliases: [],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    



    var joinedArgs = args.join(" 👏 ");
    joinedArgs += " 👏"
    
    if (!message.member.guild.me.hasPermission("MANAGE_WEBHOOKS")){
      return message.channel.send(cross +" I 👏 don't 👏 have 👏 the 👏 **Manaage Webhooks** 👏 pewmission!")
    }


    if (!joinedArgs)
      return message.channel.send(cross + "  👏 give 👏 me 👏 something 👏 to 👏 clap 👏 about");





    const webhook = await message.channel.createWebhook(
      message.member.displayName,
      message.author.displayAvatarURL
    );
    const mentionHook = new Discord.WebhookClient(webhook.id, webhook.token);
    message.delete(50);

    mentionHook.send(joinedArgs, { disableEveryone: true });
    mentionHook.delete("Expired - Party!");
  }
};
