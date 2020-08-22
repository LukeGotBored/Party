const Discord = require("discord.js");
const Canvas = require("canvas");
Canvas.registerFont("./fonts/Product Sans.ttf", { family: "Product Sans" });
var status = "none";

module.exports = {
  name: "userinfo",
  description: "get some stats!",
  aliases: ["userstats", "userinfo", "user-info", "profile", "us", "user"],
  guildOnly: false,

  async execute(message, args) {
    
    var mentionedUser = message.mentions.users.first();
    const user = message.client.util.getUser(message, args.join(" "));
    const server = message.client;

    
    // Pass the entire Canvas object because you'll need to access its width, as well its context
    const applyText = (canvas, text) => {
	  const ctx = canvas.getContext('2d');

	  // Declare a base size of the font
	  let fontSize = 70;

  	do {
		  // Assign the font to the context and decrement it so it can be measured again
	  	ctx.font = `bold ${fontSize -= 10}px "Product Sans"`;
      
	  	// Compare pixel width of the text to the canvas minus the approximate avatar size
  	} while (ctx.measureText(text).width > canvas.width - 300);

	  // Return the result to use in the actual canvas
	  return ctx.font;
    };

  

	  const canvas = Canvas.createCanvas(650, 250);
	  const ctx = canvas.getContext('2d');


    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
	  ctx.strokeStyle = '#74037b';
	  ctx.strokeRect(0, 0, canvas.width, canvas.height);

	  // Assign the decided font to the canvas
	  ctx.font = applyText(canvas, user.tag);
	  ctx.fillStyle = '#feb637';
	  ctx.fillText(user.tag, canvas.width / 2.5, canvas.height / 1.8);
    const overlay = await Canvas.loadImage("https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2Fuserinfo_overlay.png")
    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height)
	  ctx.beginPath();
	  ctx.arc(125, 125, 55, 0, Math.PI * 2, true);
    ctx.strokeStyle = "#feb637";
    ctx.lineWidth = 15;
    ctx.stroke();
	  ctx.closePath();
	  ctx.clip();
    
	  const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg', size: 512 }));
	  ctx.drawImage(avatar, 70, 70, 110, 110);
    

    
	  const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'card.png');


    
    
    
   

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const pad = string => string.toString().padStart(2, "0");
    const date = user.createdAt;
    const creationDay = `${weekdays[date.getDay()]} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    const creationTime = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    

    
    var username = user.tag
    
    if(user.bot){
      username += " <:bot:686533672119042056>"
    }
    
    var presence = "Error"  
    
    if(!user.presence.activities[0]){
      presence = "Nothing!"
    }
    
    else if(user.presence.activities[0].state){
      presence = user.presence.activities[0].state
    }
    
    else{
      presence = user.presence.activities[0].name
    }
    
 
      const UserEmbed = new Discord.MessageEmbed()

        .setColor(0xfeb637)
        .setTitle(username + " | info")
        .setThumbnail(user.displayAvatarURL())
        .addField("📅 Account Created: ", `${creationDay} ${creationTime}`, true)
        .addField("#️⃣ Tag: ", user.tag, true)
        .addField("🆔 ID:", user.id, false)
        .addField("🎮 Activity: ", presence, true)
        .addField("💬 Status: ", user.presence.status, true)
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
        .attachFiles(attachment)
        .setImage("attachment://" + "card.png")
        .setTimestamp();

      message.channel.send(UserEmbed);
  }
}
