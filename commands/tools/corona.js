const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "coronavirus",
  description: "please stay safe and rembember wash your hands!",
  guildOnly: false,
  aliases: [
    "corona",
    "virus",
    "infected",
    "coronastats",
    "virusstats",
    "virustats",
    "cv",
    "cvstats",
    "covid",
    "covid19",
    "covidstats",
    "covid19stats"
  ],

  async execute(message, args) {
    var req;
    var server = message.guild;
    var images = [
      "https://www.who.int/images/default-source/health-topics/coronavirus/safe-greetings.tmb-479v.png?sfvrsn=2e97004e_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/handshaking.tmb-479v.png?sfvrsn=4aed53c5_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/wearing-gloves.tmb-479v.png?sfvrsn=ec69b46a_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-ready-social-3.tmb-479v.jpg?sfvrsn=1706a18f_6",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-ready-social-2.tmb-479v.jpg?sfvrsn=28a6f92d_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-ready-social-1.tmb-479v.jpg?sfvrsn=c81745a7_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-smart-if-you-develop.tmb-479v.jpg?sfvrsn=1486258a_6",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-smart-inform.tmb-479v.jpg?sfvrsn=f6dbe358_6",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-safe.tmb-479v.jpg?sfvrsn=1f6e4aef_6",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-kind-to-support.tmb-479v.jpg?sfvrsn=1856f2a3_7",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-kind-to-address-stigma.tmb-479v.jpg?sfvrsn=4615bfbe_6",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-kind-to-address-fear.tmb-479v.jpg?sfvrsn=a8e99f14_6",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-1.tmb-479v.png?sfvrsn=3d15aa1c_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-2.tmb-479v.png?sfvrsn=2bc43de1_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-3.tmb-479v.png?sfvrsn=b1ef6d45_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-4.tmb-479v.png?sfvrsn=a5317377_5",
      "https://www.who.int/images/default-source/health-topics/coronavirus/stress.tmb-479v.jpg?sfvrsn=b8974505_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/children-stress.tmb-479v.jpg?sfvrsn=343355fd_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-5.tmb-479v.png?sfvrsn=633b1caa_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-6.tmb-479v.png?sfvrsn=6aafb919_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-7.tmb-479v.png?sfvrsn=e767d652_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-8.tmb-479v.png?sfvrsn=7f613ace_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-9.tmb-479v.png?sfvrsn=801fa9e_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-10.tmb-479v.png?sfvrsn=f051940e_1",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/1.tmb-479v.png?sfvrsn=1a813eed_4",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/2.tmb-479v.png?sfvrsn=13250c49_4",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/3.tmb-479v.png?sfvrsn=5e5a641_4",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/4.tmb-479v.png?sfvrsn=9719c641_4",
      "https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/5.tmb-479v.png?sfvrsn=8dcbfd5b_4"
    ];

    const latest = await fetch("https://coronavirus-tracker-api.herokuapp.com/v2/latest").then(
        response => response.json()
      );


    
    const coronaEmbed = new Discord.MessageEmbed()
      .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/236/hospital_1f3e5.png")
      .setColor("0xfeb637")
      .setTitle("Coronavirus Stats")
      .addField("Cases:", latest.latest.confirmed, true)
      .addField("Deaths:", latest.latest.deaths, true)
      .addField("**Recoveries**:", latest.latest.  recovered, true)
      .setImage(images[Math.floor(Math.random() * images.length)])
      .setFooter(
        "Party! | images provided by the World Health Organization",
        "https://i.imgur.com/B6QKBgC.png"
      )
      .setTimestamp();
    message.channel.send(coronaEmbed);
  }
};

// {"total_cases":"155,858","total_deaths":"5,814","total_recovered":"74,438","new_cases":"10,387","new_deaths":"398","statistic_taken_at":"2020-03-14 20:56:04"}
