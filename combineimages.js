const Canvas = require('canvas');
const Discord = require('discord.js');

async function combineImages(card1Buffer, card2Buffer, card3Buffer) {
    const card1Image = await bufferToCanvas(card1Buffer);
    const card2Image = await bufferToCanvas(card2Buffer);
    const card3Image = await bufferToCanvas(card3Buffer);

    // Create a new canvas with the total width of the three images plus space for transparency
    const canvas = Canvas.createCanvas(card1Image.width * 3 + 20 * 2, card1Image.height);
    const context = canvas.getContext('2d');

    // Draw the three images onto the canvas
    context.drawImage(card1Image, 0, 0);
    context.drawImage(card2Image, card1Image.width + 20, 0);
    context.drawImage(card3Image, card1Image.width * 2 + 40, 0);

    // Return the combined image
    const buffer = canvas.toBuffer();
    return buffer;
}

async function bufferToCanvas(buffer) {
    const img = new Canvas.Image();
    img.src = buffer;
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas;
}

module.exports = {
    combineImages
}
