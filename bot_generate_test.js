require("dotenv").config();
const { error } = require("console");
const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
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

    //TESTING: STANDARD DEFAULT LINKS THAT SHOULD BE REMOVED IN THE FUTURE, HARD CODED
    var test_url_1 = "https://cdn.discordapp.com";
    var test_image_url_1 = "https://cdn.discordapp.com/attachments/1106538960311828574/1106644762091585628/image.png";
    var test_image_url_2 = "https://cdn.discordapp.com/attachments/1106538960311828574/1106644803715878923/image.png";

    //test create embed with multiple images
    let embed1 = new EmbedBuilder().setTitle('Choose a Card').setColor("Red").setURL(test_url_1).setImage(test_image_url_1)
    let embed2 = new EmbedBuilder().setURL(test_url_1).setImage(test_image_url_2)

    const sentMessage = await message.channel.send({ embeds: [embed1, embed2] });


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
