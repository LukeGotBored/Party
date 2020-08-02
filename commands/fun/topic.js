const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "topic",
  description: "Get a random topic!",
  guildOnly: false,
  aliases: ["talk", "topics", "t"],

  execute(message, args) {
    const tick = message.client.emojis.get("655807079784644608").toString()
    const cross = message.client.emojis.get("655807081240330245").toString()
    const topics = [
      "What Is The Most Beautiful Song You Have Heard?",
      "What Song Gets You Pumped Every Time It Comes On?",
      "What’s Your Favorite Movie Or Show That Most People Haven’t Heard About?",
      "Who Is Your Celebrity Crush?",
      "What Song Do You Listen To The Most?",
      "If You Were Famous, What Industry Would You Like To Be Famous In?",
      "Which Of Your Friends Or Family Do You Look Up To Most?",
      "What Is Something You Got Away With As A Child That Your Family Still Doesn’t Know About?",
      "What Are The Most Common Reasons For Friendships To Fall Apart?",
      "What Is The Best Way To Meet New Friends?",
      "What Is The Most Annoying Type Of Friend?",
      "What Separates True Friends From Acquaintances?",
      "Do You Have Any Family Traditions? If So, What?",
      "What Do You Want To Be When You Grow Up?",
      "What’s A Hobby You’ve Always Wanted To Try?",
      "If You Could Eliminate One Thing From Your Daily Schedule, What Would It Be And Why?",
      "If You Had This Week To Do Over Again, What Would You Do Differently?",
      "If You Had A Uniform That You Had To Wear Every Day, What Would It Be?",
      "If You Could Go Anywhere In The Universe, Where Would You Go?",
      "What’s The Coolest Fact About The Universe You Know?",
      "What Are Some Fun Things You Could Do In Zero-G?",
      "Do You Still Consider Pluto To Be A Planet?",
      "Would You Ever Join A Mission To Colonize Another Planet If It Meant Never Returning To Earth?",
      "What’s The Most Interesting Place You’ve Visited?",
      "If You Could Live Anywhere In The World, Where Would You Choose?",
      "If You Could Go On A Trip Anywhere In The World With Anyone, Where Would You Go And Who Would You Take?",
      "When You Think Of “Home” What Do You Think Of?",
      "Hotel Or Tent?",
      "For Your Birthday, Would You Rather Go Somewhere Or Get Something?",
      "What Gift Have You Received That You Will Always Treasure?",
      "What One Possession Do You Cherish The Most?",
      "What Is The One Thing You Would Really Like To Own?",
      "What Is The Most Creative Gift You’ve Ever Made? Received?",
      "What Is The Craziest Thing You’ve Ever Done?",
      "How Often Do You Push Yourself Outside Of Your Comfort Zone?",
      "Have You Ever Overheard A Conversation You Weren’t Supposed To? What Was It About?",
      "Have You Ever Walked In On Something You Weren’t Supposed To? What Happened?",
      "Have You Ever Had To Hold Your Tongue Even Though You Really Wanted To Say What Was On Your Mind?",
      "Have you ever been talking about someone and they walk up?",
      "What Is Your Most Awkward Moment From Middle School Or High School?",
      "If You Could Add Any Word To The Dictionary, What Word Would It Be, And What Would It Mean?",
      "What Is The Most Unusual Thing In Your Wallet, Pocket, Or Purse Right At This Moment?",
      "If All Your Furniture Sprang To Life, Beauty And The Beast Style, Which Piece Would Scare You Most?",
      "If Your Best Friend Wrote A Book About You, What Would The Title Be? What About Your Worst Enemy?",
      "If You Had To Be Named After A City, State, Or Country (Etc), Which Would You Want It To Be?",
      "If You Were A Candy Bar, Which Candy Bar Would You Be?",
      "What Is A Challenge You Would Never Want To Face?",
      "What Real-Life Situation Where You Stood Up For Someone/Something?"
    ];

    const topic = topics[Math.floor(Math.random() * topics.length)];

    const topicemb = new Discord.MessageEmbed()
      .setColor("0xfeb637")
      .setTitle("🗣️ Here's a cool topic!")
      .addField("Let's talk about...", topic.toLowerCase())
      .setTimestamp()
      .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
    message.channel.send(topicemb);
  }
};
