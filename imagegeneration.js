const Canvas = require('canvas');
const Discord = require('discord.js');
const path = require('path');
const cards = require('/Champion Cards Bot/cardgeneration.js');

async function imagegenerate(card) {
  
    const canvas = Canvas.createCanvas(308, 560);
    const ctx = canvas.getContext('2d');

    // Get the values from card array
    var championName = card.find(item => item.category === 'champion')?.championName;
    var rank = card.find(item => item.category === 'skillTier')?.rank;

    // Load images based on champion name and rank
    const img1 = await Canvas.loadImage(path.join(__dirname, `./Champion Splashart/Champion Splashart PNG/${championName}.png`)); 
    ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1; // Change the alpha to make the top image transparent

    const img2 = await Canvas.loadImage(path.join(__dirname, `./Champion Splashart/rank frames/${rank}_frame.png`)); 
    ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to Buffer
    const buffer = canvas.toBuffer();

    // Return the buffer
    return buffer;
}


    module.exports = {
        imagegenerate
    }