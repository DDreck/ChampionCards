require("dotenv").config();
const { error } = require("console");
const Discord = require("discord.js");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
const cards = require('/Champion Cards Bot/cardgeneration.js');


client.once("ready", () => {
  console.log("BOT IS ONLINE"); //message when bot is online
});
client.on("error", (error) => {
  console.log(error);
});
client.on("messageCreate", async (message) => {
  if (message.content === "!cd") {

    //TODO add timer for each user before they can grab or drop cards

    //TODO send http request to generate 3 cards


    //sends request to cardgeneration.js to generate 2 cards
    const { card1, card2 } = cards.generateRandomCards();

    //logs the 2 cards generated
    console.log(`Card 1: ${JSON.stringify(card1)}`);
    console.log(`Card 2: ${JSON.stringify(card2)}`);

   // Find the values of card 1
      var champion1 = card1.find(card => card.category === 'champion')?.value;
      var championName1 = card1.find(card => card.category === 'champion')?.championName;
      var splashArt1 = card1.find(card => card.category === 'champion')?.splashArt;
      var skillTierID1 = card1.find(card => card.category === 'skillTier')?.value;
      var cardID1 = card1.find(card => card.category === 'ID')?.value;
      var printNumber1 = card1.find(card => card.category === 'printNumber')?.value;


    console.log(`Card 1 values: \nChampionID: ` + champion1 + '\nSkillTierID: ' + skillTierID1 + '\nCardID: ' + cardID1 + '\nPrintNumber: ' + printNumber1);
    message.channel.send(`Card 1 values: \nChampionID: ` + champion1 + '\nSkillTierID: ' + skillTierID1 + '\nCardID: ' + cardID1 + '\nPrintNumber: ' + printNumber1);

   // Find the values of card 1
      var champion2 = card2.find(card => card.category === 'champion')?.value;
      var championName2 = card2.find(card => card.category === 'champion')?.championName;
      var splashArt2 = card2.find(card => card.category === 'champion')?.splashArt;
      var skillTierID2 = card2.find(card => card.category === 'skillTier')?.value;
      var cardID2 = card2.find(card => card.category === 'ID')?.value;
      var printNumber2 = card2.find(card => card.category === 'printNumber')?.value;


    console.log(`\nCard 2 values: \nChampionID: ` + champion2 + '\nSkillTierID: ' + skillTierID2 + '\nCardID: ' + cardID2 + '\nPrintNumber: ' + printNumber2);
    message.channel.send(`\nCard 2 values: \nChampionID: ` + champion2 + '\nSkillTierID: ' + skillTierID2 + '\nCardID: ' + cardID2 + '\nPrintNumber: ' + printNumber2);    

    //TESTING: STANDARD DEFAULT LINKS THAT SHOULD BE REMOVED IN THE FUTURE, HARD CODED
    var test_url_1 = "https://cdn.discordapp.com";
    var test_image_url_1 = "https://cdn.discordapp.com/attachments/1106538960311828574/1106644762091585628/image.png";
    var test_image_url_2 = "https://cdn.discordapp.com/attachments/1106538960311828574/1106644803715878923/image.png";
    var card1Image = './Champion Splashart/OriginalSplasharts webp/' + splashArt1;
    var card2Image = './Champion Splashart/OriginalSplasharts webp/' + splashArt2;

    const splashart1File = new AttachmentBuilder(card1Image);
    const splashart2File = new AttachmentBuilder(card2Image);

    let embed1 = new EmbedBuilder().setTitle(championName1).setImage('attachment://' + splashArt1).setColor("Red");
    let embed2 = new EmbedBuilder().setTitle(championName2).setImage('attachment://' + splashArt2).setColor("Red");
    const sentMessage = await message.channel.send({ embeds: [embed1, embed2], files: [splashart1File, splashart2File] });


    // React to it

    await sentMessage.react("1️⃣");
    await sentMessage.react("2️⃣");

    // Create the collector filter TODO FIX BUG THAT ALLOWS BOT TO COLLECT OWN REACTION
    const collectorFilter = (reaction, user) => {
      return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && !user.bot && user.id != '1106538341194797066';
    };

    // Create the collector 
    const collector = sentMessage.createReactionCollector({
    collectorFilter,
      time: 15000,
      max: 1
      
    });
   

    // Log the collected reactions
    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name}  from ${user.tag}`);
    // Display confirmation message here
    message.channel.send(`${user} Grabbed Card ${reaction.emoji.name} !`)
    
    //convert emoji to integer "selection"
    var selection;
    switch( reaction.emoji.name ) {
        case '1️⃣':
            selection = 1;
            break;
        case '2️⃣':
            selection = 2;
            break;
        default:
            selection = null;
    }

    //store selection and user id to array
    var selectionArray = [user.id, selection]

    //log selectionArray
    console.log(selectionArray);

    //TODO: send variable selectionArray to function to give card to player

    });


    collector.on("end", (collected) => {
        console.log(`Collected ${collected.size} items`);
    });

    
  }
});

client.login(process.env.TOKEN);
