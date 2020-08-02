  const Discord = require("discord.js");
const { version } = require("../../core/config.json");

module.exports = {
  name: "credits",
  description: "Thanks to all the cool people that helped ",
  aliases: [],

  execute(message, args) {
    
    var luke = message.client.users.fetch("305771483865546752").then(luke => {
    var santiago = message.client.users.fetch("391984806638125066").then(santiago => {
    var vampy = message.client.users.fetch("330528293843632130").then(vampy => {

    
    
    const pingemb = new Discord.MessageEmbed()
      .setTitle("The Party Project | Credits:")
      .setColor(0xfeb637)
      .setDescription("Thanks to everyone that helped us during the development of this awesome bot! you guys rock!")
      .setThumbnail("https://i.imgur.com/t1P6d5P.gif")
      //.setImage("https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Fparty.gif?v=1587305080543")
      
      .addField("Developers: ", luke.tag + "\n" + santiago.tag + "\n" + vampy.tag)
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(pingemb);
    })})})}     
                                                                    
};
