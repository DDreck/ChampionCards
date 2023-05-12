require("dotenv").config();
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
    // Generate 3 random values (for testing)
    //const value1 = Math.floor(Math.random() * 100);
    //const value2 = Math.floor(Math.random() * 100);
    //const value3 = Math.floor(Math.random() * 100);

    //TODO send request to generate 3 cards


    //test create embed with multiple images
    let embed1 = new EmbedBuilder().setTitle('Choose a Card').setColor("Red").setURL('https://cdn.discordapp.com').setImage('https://cdn.discordapp.com/attachments/1106538960311828574/1106644762091585628/image.png')
    let embed2 = new EmbedBuilder().setURL('https://cdn.discordapp.com').setImage('https://cdn.discordapp.com/attachments/1106538960311828574/1106644803715878923/image.png')
    //let embed3 = new EmbedBuilder().setURL('https://cdn.discordapp.com').setImage('https://cdn.discordapp.com/attachments/1106538960311828574/1106644833080189069/image.png')
    //let embed4 = new EmbedBuilder().setURL('https://cdn.discordapp.com').setImage('https://cdn.discordapp.com/attachments/1106538960311828574/1106644833080189069/image.png')


    const sentMessage = await message.channel.send({ embeds: [embed1, embed2]
        
    //   embeds: [
    //     new EmbedBuilder()
    //       .setColor("Red")
    //       .setTitle("Choose a card")
    //       .addFields(
    //         {
    //           name: "Card 1",
    //           value: value1.toString(),
    //         }
    //       )
    //       .setURL('https://cdn.discordapp.com').setImage('https://cdn.discordapp.com/attachments/1106538960311828574/1106644762091585628/image.png')
    //       .addFields(
    //         {
    //           name: "Card 2",
    //           value: value2.toString(),
    //         }
    //       )
    //       .setURL('https://cdn.discordapp.com').setImage('https://cdn.discordapp.com/attachments/1106538960311828574/1106644762091585628/image.png')
    //       .addFields(
    //         {
    //           name: "Card 3",
    //           value: value3.toString(),
    //         }
    //       )
    //       .setURL('https://cdn.discordapp.com').setImage('https://cdn.discordapp.com/attachments/1106538960311828574/1106644762091585628/image.png')
    //   ],
      
      
    });


    // React to it

    await sentMessage.react("1️⃣");
    await sentMessage.react("2️⃣");
    //await sentMessage.react("3️⃣");
    //await sentMessage.react("4️⃣");

    // Create the collector filter
    const collectorFilter = (reaction, user) => {
      return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && !user.bot;
    };

    // Create the collector 
    const collector = sentMessage.createReactionCollector({
    collectorFilter,
      time: 15000,
      max: 1
      
    });
   

    // Log the collected reactions
    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    // Display confirmation message here
    message.channel.send(`${user} Grabbed Card ${reaction.emoji.name}!`)
    });


    collector.on("end", (collected) => {
        console.log(`Collected ${collected.size} items`);


    });

    
  }
});

client.login(process.env.TOKEN);
