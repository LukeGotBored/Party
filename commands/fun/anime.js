const Discord = require("discord.js");
const fetch = require("node-fetch");
const malScraper = require('mal-scraper')


module.exports = {
  name: "anime",
  description: "Search for an anime!",
  guildOnly: false,
  aliases: ["manga"],

  async execute(message, args) {
    
    
    const name = args.join(" ");
    
    
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    
    
    if(args.size <= 2){
      return message.channel.send(cross + " You need to input an anime title!")
    }
    
    
    
    const adata = await malScraper.getInfoFromName(name).then(data => data)

    
    
    
    
  
    
    const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...`.trim() : str.trim();
    
    if(adata.rating == ("Rx - Hentai"|| "R+ - Mild Nudity") && !message.channel.nsfw){
      return message.channel.send(cross + " That anime will be shown only on NSFW channels!\nplease mark the channel as NSFW before using it. #BeCompliant")
    }

    
    const aniEmb = new Discord.MessageEmbed()
        .setTitle(adata.title)
        .setURL(adata.url)
        .setColor(0xfeb637)
        .setDescription(trim(adata.synopsis, 256))
        .setThumbnail(adata.picture)
        .addField("Score:",adata.score ? adata.score + " ⭐": "Unknown", true)
        .addField("Episodes:", adata.episodes ? adata.episodes : "Unknown", true)
        .addField("Duration:", adata.duration ? adata.duration : "Unknown", true)
        .addField("Broadcast:", adata.broadcast ? adata.broadcast : "Unknown", true)
        .addField("Premiered:", adata.premiered ? adata.premiered : "Unknown", true)
        .addField("Status:", adata.status ? adata.status : "Unknown", true)
        .addField("Ranked: ", adata.ranked ? adata.ranked : "Unknown", true)
        .addField("Popularity: ", adata.popularity ? adata.popularity : "Unknown", true)
        .addField("Rating: ", adata.rating ? adata.rating : "Unknown", true)
        
        
        .addField("Studios:", adata.studios ? adata.studios : "Unknown", true)
        .addField("Generes:",adata.genres ? adata.genres.join(", ") : "Unknown", true)
        
        .setTimestamp() 
        .setFooter( "Source: " +  adata.source + "\nParty! x MyAnimeList", "https://i.imgur.com/B6QKBgC.png");
      message.channel.send(aniEmb);
      

  
  
  
  }
};
