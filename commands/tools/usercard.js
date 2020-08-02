const Discord = require("discord.js");
const fetch = require("node-fetch");
const Canvas = require("canvas");
Canvas.registerFont("./fonts/Product Sans.ttf", { family: "Product Sans" });

module.exports = {
  name: "card",
  description:
    "basically you get all your profile info, in a good lookin' card",
  guildOnly: false,
  aliases: ["usercard", "getcard", "userscard"],

  async execute(message, args) {
        
    const user = message.client.util.getUser(message, args.join(" "));
    const background = await Canvas.loadImage(
      "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fparty_stats.png?v=1582880129170"
    );
    
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...`.trim() : str.trim();
        
    var cpresence = "Error"  
    
    if(!user.presence.game){
      cpresence = "Nothing!"
    }
    
    else if(user.presence.game.state){
      cpresence = user.presence.game.state
    }
    
    else{
      cpresence = user.presence.game.name
    }
    
    
    const avatar = await Canvas.loadImage(user.displayAvatarURL);
    const canvas = Canvas.createCanvas(background.width, background.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(background, 0, 0);
    ctx.beginPath();
    ctx.arc(45 + 60, 45 + 60, 60, 0, Math.PI * 2);
    ctx.globalCompositeOperation = "destination-out"; // erase
    ctx.fill();
    ctx.globalCompositeOperation = "destination-over"; // draw behind
    ctx.drawImage(avatar, 45, 45, 60 * 2, 60 * 2);
    ctx.globalCompositeOperation = "source-over"; // reset

    
    // username that appears on top
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '50px "Product Sans"';
    ctx.fillText(user.tag, 210, 120);

    
    // User id
    ctx.fillStyle = "#707070";
    ctx.font = '36px "Product Sans"';
    ctx.fillText(user.id, 102, 395);
    
    
    
    // User Presence and Status
    const presence = user.presence.status;
    let formattedPresence = presence === "dnd"? "do not disturb" : presence;
    formattedPresence = formattedPresence[0].toUpperCase() + formattedPresence.slice(1)
    ctx.fillText(formattedPresence || "None", 785, 395);
    ctx.fillText(trim(cpresence, 25), 785, 615);

    
    // User creation date
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const pad = string => string.toString().padStart(2, "0");
    const date = user.createdAt;
    const creationDay = `${weekdays[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const creationTime = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    ctx.fillText(`${creationDay} ${creationTime} GMT+0`, 102, 615);

    const presenceColors = {
      online: "#43B581",
      streaming: "#593695",
      idle: "#FAA61A",
      dnd: "#F04747",
      offline: "#747F8D"
    };
    const presenceColor = presenceColors[presence];
    ctx.fillStyle = presenceColor;
    ctx.beginPath();
    ctx.arc(814, 305, 25, 0, Math.PI * 2);
    ctx.fill();

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      user.username + "_profile.png"
    );

    
    const avatarEmbed = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setImage("attachment://" + user.username + "_profile.png")
        .setTitle(user.username+ "'s Card!" )
        .setTimestamp()
        .attachFile(attachment)
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
      message.channel.send(avatarEmbed);
    

  }
};

// https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fparty_stats.png?v=1581803919701
