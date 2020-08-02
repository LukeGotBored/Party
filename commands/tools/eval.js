const Discord = require("discord.js");

module.exports = {
  name: "eval",
  description: "a developer command, please do not use this",
  aliases: [],
  guildOnly: false,

  execute(message, args) {
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...` : str;

    const client = message.client;
    const guild = message.guild;

    async function exec() {
      if (!["305771483865546752", "391984806638125066"].includes(message.author.id))  {
        message.delete();
        return;
      }

      let evaled;
      try {
        if (args == "") {
          message.react("655807081240330245");
          message.channel.send(":x: Nothing to execute!");
          return;
        }
        evaled = await eval(args.join(" "));
        message.react(client.emojis.cache.get("655807079784644608"));
        message.channel.send("Output: " + trim(evaled, 512));
      } catch (error) {
        message.react(client.emojis.cache.get("655807081240330245"));
        const flipemb = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setTitle(":x: Oh No!")
          .addField("Eval failed!", "```js\n" + error + "```")
          .setTimestamp()
          .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
        message.channel.send(flipemb);
      }
    }

    exec();
  }
};
