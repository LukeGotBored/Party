const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "hackerman",
  description: "Surfin' the 80's (Hackerman Quotes)",
  guildOnly: true,
  cooldown: 2,
  aliases: [],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");
    
    const response = await fetch("https://hackerman.wtf/api").then(
        response => response.json()
    );
    
    
    if (!message.guild.me.hasPermission('MANAGE_WEBHOOKS')){
      return message.channel.send(cross +" the firewall of permissions doesn't allow me to enter the mainframe! I need the **Manage Webhooks** permission to work!")
    }
    
    const webhook = await message.channel.createWebhook(
      "Hackerman | Party",
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Ftest.png?v=1582132089908"
    );
    
    
    
    const mentionHook = new Discord.WebhookClient(webhook.id, webhook.token);
    mentionHook.send("_" + response.quotes + "_", { "disableEveryone": true });
    
    
    
    mentionHook.delete("Expired - Party!");
  }
};