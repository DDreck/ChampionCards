const Canvas = require('canvas');
const Discord = require('discord.js');
const path = require('path');

async function imagegenerate(message){
        console.log("imagegeneration test");
        message.channel.send(`Image generating test`)

        const canvas = Canvas.createCanvas(308, 560);
        const ctx = canvas.getContext('2d');

        const img1 = await Canvas.loadImage(path.join(__dirname, './Champion Splashart/OriginalSplasharts webp/aatroxGENERATIONTEST.png')); // Replace with your image path
        ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = 1; // Change the alpha to make the top image transparent

        const img2 = await Canvas.loadImage(path.join(__dirname, './Champion Splashart/LeagueTierThumbnails/silver_frame.png')); // Replace with your image path
        ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to Buffer
        const buffer = canvas.toBuffer();

        message.channel.send({ files: [{ attachment: buffer, name: 'composite_image.png' }] });
        // Create a new Attachment
       // const attachment = new Discord.MessageAttachment(buffer, 'composite_image.png');

        // Send the image to the channel
       // message.channel.send(attachment);

        console.log("Image sent");
        message.channel.send(`Image sent`)
    }

    module.exports = {
        imagegenerate
    }