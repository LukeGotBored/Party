const Discord = require("discord.js");
var fetch = require("node-fetch");

var subreddits = ["memes", "dankmemes", "me_irl"];

module.exports = {
  name: "meme",
  description: "Lmao",
  guildOnly: false,
  aliases: ["memes", "getmeme", "lol"],

  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    const loadEmbed = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("<a:p_loading:657238016481296403> Loading!")
      .setFooter("Party! x Reddit", "https://i.imgur.com/B6QKBgC.png");

    message.channel.send(loadEmbed).then(async message => {
      const subreddits = ['memes', 'dankmemes', 'meirl', 'me_irl'];
      const randomtopic = Math.floor(Math.random() * subreddits.length);
      const { data } =  await fetch(`https://www.reddit.com/r/${subreddits[randomtopic]}/hot.json`).then((res) => res.json());
      const meme = data.children.filter((post) => !post.data.over_18 || !post.data.pinned);
      const randommeme = Math.floor(Math.random() * meme.length);
      if (!meme.length) return message.channel.send('Something went wrong. Try again');


        const memeEmbed = new Discord.MessageEmbed()
          .setColor("0xfeb637")
          .setURL(`https://www.reddit.com${meme[randommeme].data.permalink}`)
          .setTitle(meme[randommeme].data.title)
          .setImage(meme[randommeme].data.url)
          .setDescription("Posted by " + "**" + meme[randommeme].data.author + "**")
        
          .setFooter(
            "👍 Upvotes: " +  message.client.util.numtok(meme[randommeme].data.ups) + "  |  " + "💬 Comments: " + meme[randommeme].data.num_comments + "\n " + 
            "Party! x Reddit" + " | " + "Posted on r/" + meme[randommeme].data.subreddit,
            "https://i.imgur.com/B6QKBgC.png"
          );
        message.edit(memeEmbed);
      });
    }
  };