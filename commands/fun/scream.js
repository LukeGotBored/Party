const Discord = require("discord.js");

module.exports = {
  name: "scream",
  description: "Scream just like Karen",
  guildOnly: true,
  cooldown: 5,
  aliases: ["caps", "screaming", "karen"],

  async execute(message, args) {
    
    
    
    // RaGeD TexT GeNerAtoR
    args = args.join(" ");
    args = args.split("");
    var fString;
    console.log("size: " + args.length);
    for (var i = 0; i < args.length; i++) {
      let randomNumber = Math.random()
      if (randomNumber < 0.5) {
        args[i] = args[i].toLowerCase();
      } else{
        args[i] = args[i].toUpperCase();
      }
    }
    
    fString = args.join("");

    
    const tick = message.client.emojis.cache
      .get("655807079784644608")
      .toString();
    const cross = message.client.emojis.cache
      .get("655807081240330245")
      .toString();

    if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return message.channel.send(
        cross + "I DON'T HAVE THE **Manage Webhooks** PERMISSION!"
      );
    }

    const joinedArgs = args.join(" ");
    if (!joinedArgs)
      return message.channel.send(
        cross +
          " Tell me what you'd like to scream! (_p!scream i want to speak with the manager!_)"
      );
    const webhook = await message.channel.createWebhook(
      message.author.username,
      {
        avatar: message.author.displayAvatarURL(),
        reason: "Scream Command | Party"
      }
    );
    const mentionHook = new Discord.WebhookClient(webhook.id, webhook.token);
    message.delete({ timeout: 50 });
    const scream = fString;
    await mentionHook.send(scream, { disableEveryone: true });
    mentionHook.delete("Expired - Party!");
  }
};
