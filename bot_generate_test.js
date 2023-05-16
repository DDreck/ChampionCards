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
    const { card1, card2, card3 } = cards.generateRandomCards();

    //logs the 3 cards generated
    console.log(`Card 1: ${JSON.stringify(card1)}`);
    console.log(`Card 2: ${JSON.stringify(card2)}`);
    console.log(`Card 3: ${JSON.stringify(card3)}`);

   // Find the values of card 1
      var champion1 = card1.find(card => card.category === 'champion')?.value;
      var championName1 = card1.find(card => card.category === 'champion')?.championName;
      var splashArt1 = card1.find(card => card.category === 'champion')?.splashArt;
      var rankThumbnail1 = card1.find(card => card.category === 'skillTier')?.thumbnail;
      var rank1 = card1.find(card => card.category === 'skillTier')?.rank;
      var skillTierID1 = card1.find(card => card.category === 'skillTier')?.value;
      var cardID1 = card1.find(card => card.category === 'ID')?.value;
      var printNumber1 = card1.find(card => card.category === 'printNumber')?.value;

    //debug
    //console.log(`Card 1 values: \nChampionID: ` + champion1 + '\nSkillTierID: ' + skillTierID1 + '\nCardID: ' + cardID1 + '\nPrintNumber: ' + printNumber1);
    //message.channel.send(`Card 1 values: \nChampionID: ` + champion1 + '\nSkillTierID: ' + skillTierID1 + '\nCardID: ' + cardID1 + '\nPrintNumber: ' + printNumber1);

   // Find the values of card 2
      var champion2 = card2.find(card => card.category === 'champion')?.value;
      var championName2 = card2.find(card => card.category === 'champion')?.championName;
      var splashArt2 = card2.find(card => card.category === 'champion')?.splashArt;
      var rankThumbnail2 = card2.find(card => card.category === 'skillTier')?.thumbnail;
      var rank2 = card2.find(card => card.category === 'skillTier')?.rank;
      var skillTierID2 = card2.find(card => card.category === 'skillTier')?.value;
      var cardID2 = card2.find(card => card.category === 'ID')?.value;
      var printNumber2 = card2.find(card => card.category === 'printNumber')?.value;

    //debug
    //console.log(`\nCard 2 values: \nChampionID: ` + champion2 + '\nSkillTierID: ' + skillTierID2 + '\nCardID: ' + cardID2 + '\nPrintNumber: ' + printNumber2);
    //message.channel.send(`\nCard 2 values: \nChampionID: ` + champion2 + '\nSkillTierID: ' + skillTierID2 + '\nCardID: ' + cardID2 + '\nPrintNumber: ' + printNumber2);    

   // Find the values of card 3
      var champion3 = card3.find(card => card.category === 'champion')?.value;
      var championName3 = card3.find(card => card.category === 'champion')?.championName;
      var splashArt3 = card3.find(card => card.category === 'champion')?.splashArt;
      var rankThumbnail3 = card3.find(card => card.category === 'skillTier')?.thumbnail;
      var rank3 = card3.find(card => card.category === 'skillTier')?.rank;
      var skillTierID3 = card3.find(card => card.category === 'skillTier')?.value;
      var cardID3 = card3.find(card => card.category === 'ID')?.value;
      var printNumber3 = card3.find(card => card.category === 'printNumber')?.value;    

    //debug
    //console.log(`\nCard 3 values: \nChampionID: ` + champion3 + '\nSkillTierID: ' + skillTierID3 + '\nCardID: ' + cardID3 + '\nPrintNumber: ' + printNumber3);
    //message.channel.send(`\nCard 3 values: \nChampionID: ` + champion3 + '\nSkillTierID: ' + skillTierID3 + '\nCardID: ' + cardID3 + '\nPrintNumber: ' + printNumber3); 

    //image file paths

    var card1Image = './Champion Splashart/OriginalSplasharts webp/' + splashArt1;
    var card2Image = './Champion Splashart/OriginalSplasharts webp/' + splashArt2;
    var card3Image = './Champion Splashart/OriginalSplasharts webp/' + splashArt3;
    var card1Thumbnail = './Champion Splashart/LeagueTierThumbnails/' + rankThumbnail1;
    var card2Thumbnail = './Champion Splashart/LeagueTierThumbnails/' + rankThumbnail2;
    var card3Thumbnail = './Champion Splashart/LeagueTierThumbnails/' + rankThumbnail3;

    //build attachments for 3 embeds

    const splashart1File = new AttachmentBuilder(card1Image);
    const splashart2File = new AttachmentBuilder(card2Image);
    const splashart3File = new AttachmentBuilder(card3Image);
    const thumbnailFile1 = new AttachmentBuilder(card1Thumbnail);
    const thumbnailFile2 = new AttachmentBuilder(card2Thumbnail);
    const thumbnailFile3 = new AttachmentBuilder(card3Thumbnail);

    //build embeds for all 3 cards

    let embed1 = new EmbedBuilder().setTitle(championName1).setImage('attachment://' + splashArt1).setColor("Red").setThumbnail('attachment://' + rank1).setFooter({ text: `ID: ${cardID1}   Print: ${printNumber1}` });
    let embed2 = new EmbedBuilder().setTitle(championName2).setImage('attachment://' + splashArt2).setColor("Red").setThumbnail('attachment://' + rank2).setFooter({ text: `ID: ${cardID2}   Print: ${printNumber2}` });
    let embed3 = new EmbedBuilder().setTitle(championName3).setImage('attachment://' + splashArt3).setColor("Red").setThumbnail('attachment://' + rank3).setFooter({ text: `ID: ${cardID3}   Print: ${printNumber3}` });
    const sentMessage = await message.channel.send({ embeds: [embed1, embed2, embed3], files: [splashart1File, splashart2File, splashart3File, thumbnailFile1, thumbnailFile2, thumbnailFile3] });


    // React to it

    await sentMessage.react("1️⃣");
    await sentMessage.react("2️⃣");
    await sentMessage.react("3️⃣");

    // Create the collector filter TODO FIX BUG THAT ALLOWS BOT TO COLLECT OWN REACTION
    const collectorFilter = (reaction, user) => {
      return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && !user.bot && user.id != '1106538341194797066';
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
        case '3️⃣':
            selection = 3;
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
