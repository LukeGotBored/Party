 const Discord = require("discord.js");
const fetch = require("node-fetch");
const brawl = require("brawlstars.js");
const token = process.env.BRAWL
const client = new brawl.Client(token)



module.exports = {
  
  name: "brawlstars",
  description: "Get the latest infos about your Brawl Stars account!",
  guildOnly: false,
  cooldown: 2,
  aliases: ["bs", "brawl", "brawlstats"],

  async execute(message, args) {
      const randomIcon = [
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FJacky.png?v=1587023417234",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FCrow.png?v=1587023417302",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FEl-Primo.png?v=15870234173700",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FBibi.png?v=1587023417403",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FColt.png?v=1587023417437",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FRosa.png?v=1587023417466",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FLeon.png?v=1587023417541",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FNita.png?v=1587023417670",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FPenny.png?v=1587023417779",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FBarley.png?v=1587023417936",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FSandy.png?v=1587023418019",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2F8-Bit.png?v=1587023418235",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FRico.png?v=1587023418303",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FSpike.png?v=1587023418485",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FShelly.png?v=1587023418585",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FSprout.png?v=1587023418757",
        "https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FBea.png?v=1587023418890",
      ]
    
    
    
    
      const tick = message.client.emojis.get("655807079784644608").toString()
      const cross = message.client.emojis.get("655807081240330245").toString()

      try{
        const player = await client.getPlayer(args[0].toUpperCase())
          let brawlers = player.brawlers.map(item => item.name + "`[" +item.power + "]`")
          brawlers = brawlers.join(', ').toLowerCase()
        
        if(!player.club){
          var club = "Not in a club!"
          var clubname = "<:bs_noclub:700241080934727740> Club: "
          
        }
        
        else{
          club = player.club.name
          clubname = "<:bs_club:700241516907724810> Club: "
        }
        
        
        var icon;
        const BrawlEmb = new Discord.MessageEmbed()
          .setColor("0xfeb637")
          .setTitle("<:brawl:699570156803850280> BrawlStats | " + player.data.name + "  " + player.data.tag)
          //.setThumbnail(icon = randomIcon[Math.floor(Math.random() * randomIcon.length)])
          .addField(clubname, club, true)
          .addField("<:bs_trophy:699905778479267940> Trophies: ", player.data.trophies, true)
          .addField("<:bs_trophy:699905778479267940> Top Trophies:", player.data.highestTrophies, true)
          .addField("<:bs_exp:700036052957528074> Exp: ", player.data.expPoints, true)
          .addField("<:bs_level:700038578226593913> Level: ", player.data.expLevel, true)
          .addField("<:bs_bounty:700247515345322024> Total Victories: ", player.totalVictories, true)
          .addField("<:bs_solo:700041129529442334> Solo Victories: ", player.data.soloVictories, true)
          .addField("<:bs_duo:700041179496185857> Duo Victories: ", player.data.duoVictories, true)
          .addField("<:bs_trio:700040841586016296> 3vs3 Victories: ", player.trioVictories, true)
          .addField("(" + player.brawlerCount + " / 35) " + "Brawlers: ", brawlers)
          .setImage("https://cdn.glitch.com/ef1e949e-b46b-494b-b247-f5204ca69a84%2FDuo-Showdown-Legendary-Banner.jpg?v=1586855098678")
          .setTimestamp()
          .setFooter(
            "Party! x Brawl Stars",
            "https://i.imgur.com/B6QKBgC.png"
          );
      message.channel.send(BrawlEmb);
        
      } catch(error) {
        message.channel.send(cross + " I couldn't find that player! Make sure you typed the right **#TAG**")
        console.log(error)
      }
      
      

  }
};


/*
Player {
  data: {
    tag: '#9PY8JLU',
    name: 'TBM38',
    trophies: 95,
    highestTrophies: 95,
    expLevel: 4,
    expPoints: 179,
    isQualifiedFromChampionshipChallenge: false,
    '3vs3Victories': 9,
    soloVictories: 4,
    duoVictories: 1,
    bestRoboRumbleTime: 0,
    bestTimeAsBigBrawler: 0,
    club: {},
    brawlers: [ [Object], [Object], [Object], [Object] ]
  },
  tag: '#9PY8JLU',
  name: 'TBM38',
  nameColor: undefined,
  trophies: 95,
  expLevel: undefined,
  expPoints: 179,
  highestTrophies: 95,
  powerPlayPoints: undefined,
  highestPowerPlayPoints: undefined,
  trioVictories: 9,
  duoVictories: 1,
  soloVictories: 4,
  totalVictories: 14,
  bestRoboRumbleTime: 0,
  bestTimeAsBigBrawler: 0,
  isQualifiedFromChampionshipChallenge: false,
  brawlers: [
    {
      id: 16000000,
      name: 'SHELLY',
      power: 3,
      rank: 2,
      trophies: 18,
      highestTrophies: 18,
      starPowers: []
    },
    {
      id: 16000001,
      name: 'COLT',
      power: 2,
      rank: 4,
      trophies: 31,
      highestTrophies: 31,
      starPowers: []
    },
    {
      id: 16000008,
      name: 'NITA',
      power: 3,
      rank: 5,
      trophies: 40,
      highestTrophies: 40,
      starPowers: []
    },
    {
      id: 16000010,
      name: 'EL PRIMO',
      power: 1,
      rank: 1,
      trophies: 6,
      highestTrophies: 6,
      starPowers: []
    }
  ],
  brawlerCount: 4,
  club: {}
}
*/

/*
18.208.0.0/13
52.95.245.0/24
99.77.187.0/24
54.196.0.0/15
99.77.151.0/24
216.182.224.0/21
216.182.232.0/22
3.5.16.0/21
107.20.0.0/14
99.77.128.0/24
67.202.0.0/18
184.73.0.0/16
3.80.0.0/12
54.80.0.0/13
3.224.0.0/12
54.221.0.0/16
54.156.0.0/14
54.236.0.0/15
64.252.66.0/24
54.226.0.0/15
162.250.237.0/24
52.90.0.0/15
100.24.0.0/13
54.210.0.0/15
64.252.69.0/24
54.198.0.0/16
52.20.0.0/14
52.94.201.0/26
52.200.0.0/13
54.160.0.0/13
64.252.68.0/24
162.250.238.0/23
35.153.0.0/16
52.70.0.0/15
52.94.248.0/28
99.77.254.0/24
52.54.0.0/15
54.152.0.0/16
54.92.128.0/17
52.0.0.0/15
184.72.128.0/17
23.20.0.0/14
64.252.64.0/24
18.204.0.0/14
54.88.0.0/14
162.250.236.0/24
99.77.129.0/24
54.204.0.0/15
15.177.64.0/23
52.86.0.0/15
52.44.0.0/15
18.232.0.0/14
54.174.0.0/15
50.16.0.0/15
35.168.0.0/13
99.77.191.0/24
3.208.0.0/12
3.5.0.0/20
174.129.0.0/16
72.44.32.0/19
34.224.0.0/12
54.224.0.0/15
75.101.128.0/17
34.192.0.0/12
54.208.0.0/15
54.242.0.0/15
216.182.238.0/23
54.234.0.0/15
54.144.0.0/14
52.2.0.0/15
184.72.64.0/18
204.236.192.0/18
15.193.6.0/24
52.4.0.0/14
208.86.88.0/23
44.192.0.0/11
52.72.0.0/15
52.95.255.80/28
64.252.67.0/24
50.19.0.0/16
54.172.0.0/15
*/