const cards = require('/Champion Cards Bot/cardgeneration.js');
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { imagegenerate } = require('/Champion Cards Bot/imagegeneration.js');
const { combineImages } = require('/Champion Cards Bot/combineimages.js');
const { storeCard } = require('./card_store.js');


async function cardDrop(message){
  
    //TODO add timer for each user before they can grab or drop cards



    //sends request to cardgeneration.js to generate 3 cards
    const { card1, card2, card3 } = await cards.generateRandomCards();

    console.log(card1);
    console.log(card2);
    console.log(card3);
    //image file paths

    var card1Image = await imagegenerate(card1);
    var card2Image = await imagegenerate(card2);
    var card3Image = await imagegenerate(card3);

    //combine the images and send the combined image

    var combinedImage = await combineImages(card1Image, card2Image, card3Image);
    const combinedImageFile = new AttachmentBuilder(combinedImage, 'combined.png');
    const sentMessage = await message.channel.send({ files: [combinedImageFile] });

    // React to it

    await sentMessage.react("1️⃣");
    await sentMessage.react("2️⃣");
    await sentMessage.react("3️⃣");

    // Create the collector filter
    const collectorFilter = (reaction, user) => ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && !user.bot;

    //set timeout to try to fix bug that is letting bot collect own reactions

    setTimeout(() => {
    // Create the collector TODO VERY BUGGED RN WILL LET U COLLECT ANY EMOJI 
    const collector = sentMessage.createReactionCollector(collectorFilter, {
      time: 15000,
      max: 1
    });
   

    // enable collector
    collector.on("collect", async (reaction, user) => {

    //log collection in console
    console.log(`Collected ${reaction.emoji.name}  from ${user.tag}`);

     //convert emoji to card selection
     let selectedCard = null;
     
     switch( reaction.emoji.name ) {
         case '1️⃣':
             selectedCard = card1;
             break;
         case '2️⃣':
             selectedCard = card2;
             break;
         case '3️⃣':
             selectedCard = card3;
             break;
         default:
             selectedCard = null;
     }

    //store card in database
    await storeCard(selectedCard, user.id);
      
    // Display confirmation message here
    message.channel.send(`${user} Grabbed Card ${reaction.emoji.name} !`)
    

    });


    collector.on("end", (collected) => {
        console.log(`Collected ${collected.size} items`);
    });

  }, 500); //500 miliseconds timeout for the collector  



}

module.exports = cardDrop;