const Discord = require("discord.js");

module.exports = {
  name: "owo",
  description: "I'm not proud of this command",
  guildOnly: true,
  cooldown: 5,
  aliases: ["owoify", "furrify", "furry", "owotranslate", "uwu"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    



    const joinedArgs = args.join(" ");
    
    if (!message.guild.me.hasPermission('MANAGE_WEBHOOKS')){
      return message.channel.send(cross +" i don't have dee **Manyage Webhooks** pewmission! UwU")
    }


    if (!joinedArgs)
      return message.channel.send(cross + "  u nyeed to input something to owo-ify");

    var owoed = joinedArgs.replace(/n([aeou])/g, "ny$1");
    owoed = owoed.replace(/[rl]/g, "w");
    owoed = owoed.replace(/[RL]/g, "W");
    owoed = owoed.replace(/ove/g, "uv");
    owoed = owoed.replace(/the/, "dee");

    const words = owoed.split(" ").map(word => {
      if (Math.random() < 0.15) return `${word[0]}-${word}`;
      return word;
    });
    owoed = words.join(" ");

    const webhook = await message.channel.createWebhook(
      message.member.displayName,
      message.author.displayAvatarURL
    );
    const mentionHook = new Discord.WebhookClient(webhook.id, webhook.token);
    message.delete(50);

    mentionHook.send(owoed, { disableEveryone: true });
    mentionHook.delete("Expired - Party!");
  }
};
