const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wouldyourather",
  description: "Would you rather...",
  guildOnly: false,
  aliases: ["wyr", "wouldyr"],

  execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608").toString()
    const cross = message.client.emojis.cache.get("655807081240330245").toString()
    const topics = [
        "Eat peanut butter flavored poo or poo-flavored peanut butter?",
        "Break the most valuable thing in your house or the most valuable thing in a store?",
        "Find $100,000 that you can keep or find $1 million dollars that you have to give to charity?",
        "Know the time of your death or the cause of your death?",
        "Be able to turn something into reality by drawing it or make something disappear just by erasing it?",
        "Skinny dip with a coworker/classmate or a complete stranger?",
        "Get free food everywhere you go or free wifi?",
        "Be able to control your dreams or be able to control your destiny?",
        "Have no one show up to your wedding or no one show up to your funeral?",
        "If you were stranded on a desert island with your dog, would you rather eat your dog or starve to death?",
        "Always be dressed-up or always be dressed-down?",
        "Have one wish granted to you today or 3 wishes granted in 10 years?",
        "Would you rather never have internet access in your home or never have phone coverage when you’re out and about?",
        "Pay 50% of your salary in taxes towards universal healthcare or pay no taxes but get no healthcare and no public schooling?",
        "You have two choices: Marry your enemy and save your mom’s life or marry the person of your dreams but your mom turns into a drug addict.",
        "Always fall asleep at 9pm and wake up at 6am or always fall asleep at 1am and wake up at 10am?",
        "Be able to disappear or erase someone’s memory?",
        "See your friend’s mom naked or be naked in front of your friend’s mom?",
        "Be forced to smell everything you hear or everything you see?",
        "Forget how to ride a bike or how to type?",
        "Have no ears or no eyes?",
        "Blindly touch something or blindly taste something?",
        "Have horseradish breath or kimchi B.O.?",
        "Go bald or get a cavity every time you ate something with sugar in it?",
        "Turn red every time you consumed alcohol or turn red every time you ate something spicy?",
        "Drown to death or burn to death?",
        "Have a bath of spiders or a shower of slugs?",
        "Wipe with sandpaper or use vinegar for eye drops?",
        "Have the perfect family but be dirt poor or be a millionaire with a broken family?",
        "Have one foot twice as big as the other or one ear twice as big as the other?",
        "Have every liquid taste like salt water or have every liquid taste like sugar water?",
        "Have it burn when you pee or burn when you drink?",
        "Never be noticed for what you say or never be noticed for what you wear?",
        "Always forget where you put your keys or always forget where you parked your car?",
        "Have more time or more money?",
        "If you had the power of annihilation, which group would you choose to eliminate: rapists or serial killers?",
        "Would you rather have your destiny decided by a random group of people or an automated machine?",
        "Sneeze every time you meet a new person or gain 10 pounds every time you look at a burger?",
      
        // more sensitive questions
      
        "Rescue your dog from a burning building or rescue a stranger in the same burning building?",
        "Die happy in 10 years or die unhappy in 50 years?",
        "If you had the power to do so, would you rather give a homeless person a job or give them a place to live for free for the rest of their life?",
        "Tell your significant other that you have a love child with someone else or hide it from them for the rest of your life?",
        "Lose all of your teeth or lose one eye?",
        "Have the plug pulled on you if you were in a vegetative state or keep living?",
        "Keep the baby even if it meant living below the poverty line or give it up for adoption with the hope that he/she will have a better life?",
        "Would you rather go to jail for a crime you didn’t commit or get out on bail but the person who bails you goes broke?",
        "Save your wife/husband or save your mom/dad?",
        "Never get promoted in your job but receive guaranteed stability or get promoted at the risk of getting laid off?",
        "Take a well-paying job right out of high school or go to college with no guarantee that you’ll be employed afterwards?",
        "Divorce your spouse who you caught cheating or cheat on them to get even?",
        "Live 10 years in isolation to make 10 million dollars or live with your loved ones but make only $20k/year for the rest of your life.",
        "Commute for 2 hours a day but earn a large salary or not commute and earn minimum wage?",
        "Save 1 person you know or save 100 people you don’t know?",
        "Write a book about your life or have someone who hates you make a movie about your life?",
        "Get a random tattoo or get a random piercing (you can't choose what type or where)?",
      
      
        
    ];

    const topic = topics[Math.floor(Math.random() * topics.length)];

    const topicemb = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("👥 Would you rather..")
      .setDescription(topic.toLowerCase())
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(topicemb)
        .then(function (message) {
             
            message.react("🅰️")
            message.react("🅱️")
    });
  }
};
