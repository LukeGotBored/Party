const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "hackerman",
  description: "Surfin' the 80's (Hackerman Quotes)",
  guildOnly: true,
  cooldown: 2,
  aliases: [],

  async execute(message, args) {
    const tick = message.client.emojis.cache
      .get("655807079784644608")
      .toString();
    const cross = message.client.emojis.cache
      .get("655807081240330245")
      .toString();

    var hackerJson = JSON.parse('{"sentences":["I may start an adaptive OS with the proprietary core, it will export the analog adapter.","The exeption wraps. Let it analyze before using it.","Test blockchain buckets, then you can regulate grids!","She may coordinate mainframe networks with the reserved signal, it will virtualize the weak status.","Sample ranges checkouted a logical MCU. With thread observers!","The intelligence randomizes. Let it change by itself.","Bottleneck strings loop the patented status process. With a template stream!","He accessed the adapter label and bypassed bottleneck firewalls.","The gitlab tests. Let it encode by itself.","Indicator identifiers build the monitor. With an object database!","I need to merge the performance thread warning!","You can\'t compile an object, it will connect the server drone!","Decrypt the troll bottleneck, then you can define repositories!","He needs to control global array controllers!","The USB deauths. Let it compile by itself.","Synchronize the LAN loop, then you can power forbidden drones!","The system detects. Let it index by itself.","IoT templates will start sample breadboards. With server functions!","He needs to loop biometric deauthers!","You need to index recursive microcontroller lemurs!","He indexed the tuple monitor and blocked antennas.","The handler addresses. Let it regulate by itself.","A path component loads app cores. With double processes!","You can\'t copy the hexadecimal controller clock, it will deauth the platform-specific repository log!","You can\'t power adaptive blockchains, it will constrain the path!","Enter WAN simulators, then you can merge the encoder writer!","The dictionary NAS will add platform-specific algorithm frameworks. With a cookie blockchain!","You can\'t detect artificial USB caches, it will analyze breadboard lists!","I regulated the WiFi origin and infected signals.","Guidance container emulations synchronized a 8-bit regulator. With an application dictionary!","She may encode the 8-bit virus, it will append malfunctioning waves.","I compiled the NAS singleton and looped a linguistic GTFO.","Tuples access bar systems. With a bandwidth bandwidth!","Mute the indicator LED, then you can decrypt logical model writers!","She can encode asynchron OS collectors with the reserved camera DVD, it will remove the inductive list space.","You cleared the dimension blockchain and virtualized tags.","The bandwidth changes. Let it add by itself.","It decompiled the list document and shortened patterns.","It needs to build the standardized reference java!","He needs to match the linguistic range information!","Decentralize malfunctioning provider cookies, then you can inspect build in repository exeptions!","You benchmarked the syntax mainframe and inverted a decimal NaN.","Stash decentralized transmitters, then you can constrain the haptic transmitter framework!","It may test laser sequences with the customized battery application, it will compile clouds.","It printed the analyzer NAS and cloned the data monitor.","Port remote microcontroller streams, then you can split sophisticated switch requests!","You need to encode quantum origins!","Encrypt range indexes, then you can decompile implicit services!","It can fetch a customized error algorithm with the modern token, it will normalize the matching northbridge.","It needs to process digital display firewalls!","The wildcard writer will define the common range northbridge. With OS arrays!","You can\'t restrict web masters, it will export strings!","The module parses. Let it remove before using it.","He may append random simulator labels, it will request reserved frameworks.","She needs to append the tag observer!","The signal displays. Let it format before using it.","The algorithm compiles. Let it decrypt by itself.","Interactive system warnings will push an open integer. With a service editor!","I may append a container interface, it will monitor standardized doubles.","You can\'t control a MCU, it will partition the null integer!","You can\'t control the controller, it will debug the null network!","The emulation partitions. Let it decompile by itself.","It needs to start the 8-bit interpreter!","He needs to sequence handler MCUs!","The NAS inverts. Let it block before using it.","The object cloud will synthesize origin networks. With an integer singleton!","He cloned the fax frame and taged app patterns.","The web intercepts. Let it restrict before using it.","Phones request interactive component models. With a ASCII foo!","The bar system will infect audio antenna singletons. With a sensor bucket!","It needs to mute linguistic cookie threads!","Cookies will infect a statistical data. With signal containers!","You can\'t convert a build in indicator wildcard, it will interpret codes!","You can\'t average the intelligence singleton, it will loop transmitters!","The IoT forks. Let it observe before using it.","He can access controllers with a micro NaN service, it will decrypt DVDs.","He splited the drone app and fetched mathematical emulation arrays.","You indexed the service commit and matched a troll pattern.","You exported the provider internet and decrypted the ethernet HDD.","I may clear flexible objects with the similar sequence switch, it will process biometric analyzers.","You can\'t build the sensor controller, it will change decimal controllers!","You analyzed the UTF-8 microcontroller and ported an interpreter server.","Synchronize the bucket, then you can detect references!","Common streams build a container. With a NAS tag!","You splited the code java and monitored similar patterns.","I formated the camera function and pushed the phone.","It needs to clear digital buckets!","You parsed the DVD IoT and randomized micro signals.","Init digital function cables, then you can clear mathematical spacehuhn sensors!","She needs to parse patented wave monitors!","A NaN homepage will display wildcards. With IoT tags!","Enter performance log cybernukes, then you can virtualize the decentralized web keyboard!","She may tag mobile microcontroller patterns with an emulation module, it will export physical document strings.","The monitor iterates. Let it bypass by itself.","You can\'t develop driver spaces, it will infect paths!","Coordinate the demon limit, then you can synthesize spaces!","I need to fork asymmetric container firewalls!","It needs to port the cloud switch!","You can\'t alter quality spaces, it will invert encoder clouds!","Clone the mathematical stash foo, then you can bypass the e-mail double!"]}')
    
    
    if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      const HackerEmbed = new Discord.MessageEmbed()
        .setAuthor(
          "Hackerman",
          "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Ftest.png?v=1582132089908"
        )
        .setFooter(
          "Quick tip: grant me the MANAGE_WEBHOOKS permission to let the hackerman itself send this message"
        )
        .setColor("0xfeb637")
        .setDescription("_" + hackerJson.sentences[Math.floor(Math.random() * (hackerJson.sentences.length - 1 + 1)) + 1] + "_");
      return message.channel.send(HackerEmbed);
    }

    const webhook = await message.channel.createWebhook("Hackerman | Party", {
      avatar:
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2Ftest.png?v=1582132089908",
      reason: "Hackerman command ran by" + message.author.tag
    });

    const mentionHook = new Discord.WebhookClient(webhook.id, webhook.token);
    await mentionHook.send("_" + hackerJson.sentences[Math.floor(Math.random() * (hackerJson.sentences.length - 1 + 1)) + 1] + "_", {
      disableEveryone: true
    });

    mentionHook.delete("Expired - Party!");
  }
};
