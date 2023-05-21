const cards = require('/Champion Cards Bot/cardgeneration.js');
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { imagegenerate } = require('/Champion Cards Bot/imagegeneration.js');
const { combineImages } = require('/Champion Cards Bot/combineimages.js');


async function cardDrop(message){
  
    //TODO add timer for each user before they can grab or drop cards



    //sends request to cardgeneration.js to generate 3 cards
    const { card1, card2, card3 } = cards.generateRandomCards();

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

  }, 500); //500 miliseconds timeout for the collector  



}

module.exports = cardDrop;