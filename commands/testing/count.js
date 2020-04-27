module.exports = {
    name: 'count',
    cooldown: 5,
    description: 'Shows the amount of servers using the bot.',
    run: async(client, message, args) => {
        await message.channel.send(`Shelly is being used on ${client.guilds.cache.size} servers!`);
    },
};