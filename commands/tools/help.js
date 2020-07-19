const Discord = require("discord.js");
const { promisify } = require("util");
const fs = require("fs");


module.exports = {
  name: "commands",
  description: "the full list of commands",
  guildOnly: false,
  aliases: ["cmds", "help", "command", "guide", "cmd"],

  async execute(message, args) {
    
    if (args[0] && args[0].toLowerCase() === "help")
      return message.reply("you somehow violated the laws of time and space, congratulations")
    
    const readdir = await promisify(fs.readdir);
    let categories = await readdir("./commands/");

    categories = categories.map(category => {
      const info = require(`../${category}/info.json`);
      info.name = category;
      return info;
    });
      
    if (args.length === 0) {
      let helpEmbed = new Discord.RichEmbed()
        .setThumbnail(
          "https://cdn.discordapp.com/avatars/527625435128004628/ddc9359cffc10c8d150d5d738a3cc336.png?size=2048"
        )
        .setColor("0xfeb637")
        .setTitle("Need some help?")
        .setDescription(
          "Here's all of my categories. You can run `p!help <category>` to get every command of a category!"
        )
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
        .setTimestamp();

      for (const category of categories) {
        helpEmbed = helpEmbed.addField(
          `${category.emoji}  ${category.name}`,
          category.description,
          true
        );
      }
      message.channel
        .send(helpEmbed)
        .catch(() =>
          message.reply(":x:  I can't send the message! check your settings!")
      );
      return
    }
            
    for (const category of categories) {
      if (args[0].toLowerCase() === category.name) {
        const commands = (await readdir(`./commands/${category.name}/`))
          .filter(file => file.endsWith(".js"))
          .map(file => file.slice(0, -3))
        const joinedCommands = `\`${commands.join("`, `")}\``
        const helpEmbed = new Discord.RichEmbed()
        .setThumbnail(
          "https://cdn.discordapp.com/avatars/527625435128004628/ddc9359cffc10c8d150d5d738a3cc336.png?size=2048"
        )
        .setColor("0xfeb637")
        .setTitle(`${category.emoji}  ${category.name}`)
        .setDescription(
          `Here's all of the ${category.name} category's commands. You can run \`p!help <command>\` to learn how to use them!\n\n${joinedCommands}`
        )
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
        .setTimestamp();
        return message.channel.send(helpEmbed)
      }
    }
    for (let command of message.client.commands) {
      command = command[1]
      command.aliases = command.aliases || []
      if (command.guildOnly == undefined)
        command.guildOnly = false
      if (command.nsfwOnly == undefined)
        command.nsfwOnly = false
      
      if (args[0].toLowerCase() === command.name || command.aliases.includes(args[0].toLowerCase())) {
        const helpEmbed = new Discord.RichEmbed()
        .setThumbnail(
          "https://cdn.discordapp.com/avatars/527625435128004628/ddc9359cffc10c8d150d5d738a3cc336.png?size=2048"
        )
        .setColor("0xfeb637")
        .setTitle(`infos on: ${command.name} command`)
        .addField("❓  description:", command.description)
        .addField("👥  server only:", command.guildOnly, true)
        .addField("🔞  NSFW only:", command.nsfwOnly, true)
        .addField("🗳️  aliases:", command.aliases.length != 0? `\`${command.aliases.join("`, `")}\`` : "none")  
        .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png")
        .setTimestamp();
        return message.channel.send(helpEmbed)
        message.channel.send("test")
      }
    }
    message.channel.send(":x:  couldn't find a category/command by that name!")
  }
};
