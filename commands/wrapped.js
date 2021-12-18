const Discord = require('discord.js');
const Canvas = require('canvas');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const { stat } = require('fs');

class UserStats {
    constructor(sent_year, first_message, top_channel) {
        this.sent_year = sent_year,
        this.first_message = first_message,
        this.top_channel = top_channel
    }
}

// module.exports = {
//     name: 'wrapped',
//     cooldown: 40,
//     description: 'Bordellen Wrapped',
//     run: async(client, message, args) => {
//         console.log(`${message.author.username} requested a Wrapped.`);

//         // Generate message amount
//         // Generate favourite channel
//         // Generate first message
//         let userStats = await getUserStats(message); 

//         const image = await generateImage(message.author, userStats.sent_year, userStats.first_message, '789'); 
//         const attachment = new Discord.MessageAttachment(image.toBuffer()); 
//         message.channel.send('', attachment)
//     },
// };

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wrapped')
        .setDescription('Get your Bordellen Wrapped.'),
    async execute(interaction){
        const stats = await getUserStats(interaction); 
        const image = await generateImage(interaction.user, stats.sent_year, stats.first_message, '1337');
        const attach = new MessageAttachment(image.toBuffer(), 'cum.png');

        await interaction.reply({
            files: [attach]
        })
    }
};

async function generateImage(user, messages, first_message, channel) {

    //Define canvas
    const canvas = Canvas.createCanvas(600, 600);
    const ctx = canvas.getContext('2d');
    
    //Load bg from static
    const background = await Canvas.loadImage(
        path.join(__dirname, '../static/wrapped_swe.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)


    //Load avatar
    const avatarLoaded = await Canvas.loadImage(user.displayAvatarURL({format: 'png'})); 
    x = 201
    y = 179
    ctx.drawImage(avatarLoaded, x, y, 80, 80);

    //Draw text on image
    ctx.font = "25px Arial";
    ctx.fillText(user.username,296, 205)
    ctx.font = "14px Arial";
    ctx.fillText(user.id, 297, 230)
    ctx.font = "30px Arial";
    ctx.fillText(messages, 203, 316)
    ctx.font = "24px Arial";
    ctx.fillText(first_message, 280, 430)
    
    return canvas; 
}

async function getUserStats(interaction) {
    const userId = interaction.user.id;
    console.log(userId); 

    let msgcount = await interaction.channel.messages.fetch({ force: true })
        .then(msg => msg.filter(m => m.author.id === userId).size)
        .catch(console.error);


    return new UserStats(msgcount, msgcount, msgcount, msgcount);
}

