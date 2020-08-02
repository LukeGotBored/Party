const Discord = require("discord.js");

module.exports = {
  name: "yearprogress",
  description: "can't wait 'till 100%, eh?",
  guildOnly: false,
  aliases: ["yp"],

  execute(message, args) {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculate the days and then the percentage
    const day = Math.floor(diff / oneDay);
    const percentage = Math.round(10 * ((100 * (day - 1)) / (365 - 1))) / 10;
    const dayleft = 365 - day;

    // Default Message
    let progress = ":x: There was an error! try again later";

    const chars = {
       0: "░",
       5: "▒",
      10: "█"
    };

    if (percentage) {
      progress = "";
      const roundedPercentage = Math.round(percentage / 5) * 5; // round to nearest 5
      const five = roundedPercentage % 10; // can either be 5 or 0
      const tens = (roundedPercentage - five) / 10;
      progress += chars[10].repeat(tens); // add the "10" chars
      progress += five ? chars[5] : ""; // if there's 5, add the "5" char
      progress += chars[0].repeat(10 - progress.length); // fill the bar with blank chars
    }

    const yearEmbed = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("Year Progress")
      .addField("Percentage:", percentage + "%", true)
      .addField("Progress Bar:", progress, true)
      .addField("Days left:", dayleft + " days", false)
      .setThumbnail(
        `http://s-m-g.xyz/calendar-emoji/?day=${now.getDate()}&month=${now.getMonth() + 1}`
      )
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(yearEmbed);
  }
};
