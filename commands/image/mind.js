const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");

module.exports = {
  name: "changemymind",
  description: "discord bots are overrated\n=============\nchange my mind",
  guildOnly: false,
  aliases: ["cmm", "change", "mind"],

  async execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608");
    const cross = message.client.emojis.get("655807081240330245");

    // Setup
    
    var text = "you need to type it like this:\n _\"p!mind user, text\"_";
    var collec = args.join(" ").split(",");

    // Splits every ","
    if (collec.length > 1) {
      var user = message.client.util.getUser(message, collec[0]);
      text = collec[1];
    } else if (collec.length >= 1){
      user = message.author;
      text = collec[0];
    }
    
    
    if(text.length > 70){
      text = "the message is too long!"
    }
    if(text.length < 1){
      text = "you need to type it like this:\n\"p!mind user, text\""
    }
    
    
    text = text.trim()

    // Loads Images and font
    const overlay = await Canvas.loadImage(
      "https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2Fchangemymind_overlay.png?v=1589801533100"
    );
    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    const canvas = Canvas.createCanvas(overlay.width, overlay.height);
    const ctx = canvas.getContext("2d");
    ctx.font = ctx.font.replace(/\d+px/, "24px");

    // Draws images
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);
    ctx.rotate((Math.PI / 180) * -26); //increment the angle and rotate the image
    ctx.drawImage(avatar, 87, 95, 74, 74);
    ctx.rotate((Math.PI / 180) * 3); //increment the angle and rotate the image

    
    // Wraps text, fucking hell
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
      var words = text.split(" "),
        line = "",
        lineCount = 0,
        i,
        test,
        metrics;

      for (i = 0; i < words.length; i++) {
        test = words[i];
        metrics = context.measureText(test);
        while (metrics.width > maxWidth) {
          // Determine how much of the word will fit
          test = test.substring(0, test.length - 1);
          metrics = context.measureText(test);
        }
        if (words[i] != test) {
          words.splice(i + 1, 0, words[i].substr(test.length));
          words[i] = test;
        }

        test = line + words[i] + " ";
        metrics = context.measureText(test);

        if (metrics.width > maxWidth && i > 0) {
          context.fillText(line, x, y);
          line = words[i] + " ";
          y += lineHeight;
          lineCount++;
        } else {
          line = test;
        }
      }

      context.fillText(line, x, y);
    }

    var context = ctx;
    var maxWidth = 400;
    var lineHeight = 24;
    var x = (canvas.width - maxWidth) / 2;
    var y = 60;
    wrapText(ctx, text, 140, 390, 260, 22);
    

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_mind.png"
    );
    message.channel.send(attachment);
  }
};
