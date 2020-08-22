const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "job",
  description: "but... you didn't do anything!",
  guildOnly: false,
  aliases: [],

  async execute(message, args) {
    const user = message.client.util.getUser(message, args.join(" "));
    const canvas = Canvas.createCanvas(512, 1011);
    const ctx = canvas.getContext("2d");




    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2Fjob_overlay.png?"
    );
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png', size: 1024}));
    ctx.drawImage(avatar, 152, 68, 79, 79);
    ctx.drawImage(avatar, 20, 864, 79, 79);
    
    const overlay2 = await Canvas.loadImage(
      "https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2Fjob_overlay2.png?v=1598104710932"
    );
    ctx.drawImage(overlay2, 0, 0, canvas.width, canvas.height);
    
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      user.username + "_job.png"
    );

    message.channel.send(attachment);
  }
};
