const Discord = require("discord.js");

module.exports = {
  name: "lmgtfy",
  description: "Let me google that for you",
  guildOnly: true,
  cooldown: 5,
  aliases: ["letmegooglethatforyou",],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    const joinedArgs = args.join(" ");
    if (!message.guild.me.hasPermission('MANAGE_WEBHOOKS')){
      return message.channel.send(cross +" i can't look that up for you without the **Manage Webhooks** permission!")
    }
    if (!joinedArgs)
      return message.channel.send(
        cross + " you need to provide something to google!"
      );
    const webhook = await message.channel.createWebhook(
      message.author.username,
      {avatar: message.author.displayAvatarURL(), reason: "Ran LMGTFY command"}
    );
    const mentionHook = new Discord.WebhookClient(webhook.id, webhook.token);
    message.delete({timeout: 50});
    const baseURL = "https://lmgtfy.com/?q=";
    const url =
      baseURL + encodeURIComponent(joinedArgs.slice(0, 2000 - baseURL.length));
    await mentionHook.send(`Here, **[LMGTFY](<${url}> 'Let me Google that for you')**`, { "disableEveryone": true });
    mentionHook.delete("Expired - Party!");
  }
};