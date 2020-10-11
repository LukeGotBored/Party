const Discord = require("discord.js");

module.exports = {
  name: "purge",
  description: "purge (x) amount of messages",
  guildOnly: true,
  aliases: ["clear", "clean", "delete", "bulkdelete"],

  execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    const amount = parseInt(args[0] + 1);

    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      if (isNaN(amount)) {
        return message
          .reply(cross + " That doesn't seem to be a valid number.")
          .then(msg => {
            msg.delete(5000);
          });
      } else if (amount < 2 || amount > 100) {
        return message
          .reply(cross + "you need to input a number between 2 and 100.")
          .then(msg => {
            msg.delete(5000);
          });
        message.delete();
      }

      message.delete();
      message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel
          .send(
            cross +
              "There was an error, perhaps you forgot to give me the **Manage Messages** permission?"
          )
          .then(msg => {
            msg.delete(5000);
          });
      });

      message.channel
        .send(tick + " Deleted " + amount + " message/s!")
        .then(msg => {
          msg.delete(5000);
        });
    } else {
      message.channel.send(
        cross +
          " " +
          message.author +
          ", " +
          "you must have the **Manage Messages** permission to use this command!"
      );
    }
  }
};
