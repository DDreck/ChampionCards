require("dotenv").config();
const { error } = require("console");
const Discord = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");
const { imagegenerate } = require('/Champion Cards Bot/imagegeneration.js');
const cardDrop = require('./card_drop.js');




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
  if (message.content === '!test') {
    imagegenerate(message);
  }
  if (message.content === "!cd") {
    await cardDrop(message);
  }
  if (message.content === "!testcd") {
    console.log(`begin test`);
    await testcardDrop(message);
  }
});

client.login(process.env.TOKEN);
