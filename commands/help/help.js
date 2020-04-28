const Discord = require('discord.js');


module.exports = {
    name: 'help',
    cooldown: 5,
    description: 'Prints all commands available for the user.',
    run: async(client, message, args) => {

        const embeddedMessage = new Discord.MessageEmbed()
            .setColor('#0093ff')
            .setTitle(`Shelly commands:`)
            .addFields({
                name: '?inhouse',
                value: `Starts a new inhouse`,
                inline: true
            }, {
                name: '?ping',
                value: `Pings the server`,
                inline: true
            }, {
                name: '?count',
                value: `Shows the number of servers using the bot`,
                inline: true
            }, {
                name: '?help',
                value: `Shows all commands - aka what you just used.`,
                inline: true
            })
            .setTimestamp();


        await message.channel.send(embeddedMessage);
    },
};