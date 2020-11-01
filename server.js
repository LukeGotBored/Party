const fs = require("fs");
const Discord = require("discord.js");
const express = require(express);
const app = express();
const DBL = require("dblapi.js");
const client = new Discord.Client({ disableMentions: 'everyone' });
const dbl = new DBL(process.env.BOTGG, client);
const { prefix, status, version } = require("./core/config.json");
const cooldowns = new Discord.Collection();
const util = require("./utils/functions.js");
client.commands = new Discord.Collection();
Object.assign(client, util);
client.util = util;

// useless thing, just for debug
const today = new Date();
const time =
  today
    .getHours()
    .toString()
    .padStart(2, "0") +
  ":" +
  today
    .getMinutes()
    .toString()
    .padStart(2, "0") +
  ":" +
  today
    .getSeconds()
    .toString()
    .padStart(2, "0");

const commandCategories = fs.readdirSync("./commands");

for (const category of commandCategories) {
  const commands = fs
    .readdirSync(`./commands/${category}`)
    .filter(file => file.endsWith(".js"));
  for (const commandName of commands) {
    const command = require(`./commands/${category}/${commandName}`);
    command.category = category;
    client.commands.set(command.name, command);
  }
}

client.on("ready", () => {
  console.log("Updated! " + time);
  client.user.setPresence({ 
  status: "idle", 
  activity: { 
  name: "#HaveFun | Party 4.3", 
  type: "PLAYING" 
  }})
});


function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return client.users.get(mention);
	}
}

function getUserFromMentionRegEx(mention) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	const id = matches[1];

	return client.users.get(id);
}


client.on("message", async message => {
  if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot)
    return;

  const withoutPrefix = message.content.slice(2);
	const split = withoutPrefix.split(/ +/);
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel
        .send(
          ":x: Hey **" +
            message.author.username +
            ",** " +
            `Slow Down! You need to wait ${Math.round(
              timeLeft
            )} more second(s) before reusing the \`${command.name}\` command!`
        )
        .then(msg => {
          msg.delete({timeout: 5000});
        });
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    if (command.guildOnly && message.channel.type !== "text") {
      return message.reply(":x:  I can't execute that command here!");
    }
    
    if (command.nsfwOnly && !message.channel.nsfw){
      return message.reply("<a:p_no:655807081240330245> This command will be shown only on NSFW channels!\nplease mark the channel as NSFW before using it. #BeCompliant")
    }
    
    
     if (command.developerOnly && !["305771483865546752", "391984806638125066"].includes(message.author.id))  {
        message.delete();
        return message.reply("<a:p_no:655807081240330245> This command is only for developers!")
     }
    
    
    if (command.votersOnly){
       if (!(await dbl.hasVoted(message.author.id))){
         
       const lockEmbed = new Discord.MessageEmbed()
        .setColor("0xfeb637")
        .setTitle("🔒 This command is locked!")
        .setDescription("You can **unlock** this command by [voting!](https://top.gg/bot/527625435128004628/vote)")
        .setFooter("Party! | can't vote? try p!vote", "https://i.imgur.com/B6QKBgC.png")
        .setThumbnail("https://cdn.glitch.com/76b98dfe-b6a5-425a-bd10-be07af6b4014%2Ffinal%20final%20final%20final.gif?v=1601223987756")
         return message.reply(lockEmbed)
       }
    }

    command.execute(message, args);
  } catch (error) {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle(":x: Uh Oh! there was an error!")
      .addField(
        "please contact the developer",
        "Join the support server [Here](https://discord.gg/7Wx3jVD)"
      )
      .setDescription(error)
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.reply(errorEmbed);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN)
  .then(console.log("Successfully logged in!"));


app.get("/api/stats", function(req, res) {
   	res.header('Access-Control-Allow-Origin', '*');
        res.json({"guilds": client.guilds.cache.size, });
    });

    const listener = app.listen(process.env.PORT, () => {
      console.log("Your app is listening on port " + listener.address().port);
    });
