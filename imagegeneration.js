const Canvas = require('canvas');
const Discord = require('discord.js');
const path = require('path');
const cards = require('/Champion Cards Bot/cardgeneration.js');

async function imagegenerate(card) {
    const canvas = Canvas.createCanvas(308, 560);
    const ctx = canvas.getContext('2d');

    // Load the "Bebas Neue" font
   // const { registerFont } = Canvas;
   // const fontPath = path.join(__dirname, '/fonts/BebasNeue-Regular.ttf');
   // registerFont(fontPath, { family: 'BebasNeue' });
   


    // Get the values from card array
    var championName = card.find(item => item.category === 'champion')?.championName;
    var rank = card.find(item => item.category === 'skillTier')?.rank;
    var printNumber = card.find(item => item.category === 'printNumber')?.value;

    // Load images based on champion name and rank
    const img1 = await Canvas.loadImage(path.join(__dirname, `./Champion Splashart/Champion Splashart PNG/${championName}.png`)); 
    ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1; // Change the alpha to make the top image transparent

    const img2 = await Canvas.loadImage(path.join(__dirname, `./Champion Splashart/rank frames/${rank}_frame.png`)); 
    ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);

        
    // Add text at the bottom middle
     ctx.font = '42px Bebas Neue';
     ctx.fillStyle = '#000000';
     ctx.textAlign = 'center';
     ctx.fillText(championName, canvas.width / 2, canvas.height - 55); // Adjust the y-coordinate for championName

     // Add text at the bottom left
     ctx.font = '20px Bebas Neue';
     ctx.fillStyle = '#000000';
     ctx.textAlign = 'right';
     ctx.fillText(printNumber, canvas.width - 80, canvas.height - 25); // Adjust the coordinates for printNumber


    // Convert the canvas to Buffer
    const buffer = canvas.toBuffer();

    // Return the buffer
    return buffer;
}


    module.exports = {
        imagegenerate
    }