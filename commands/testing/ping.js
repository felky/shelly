module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Get the bot latency.',
    run: async(client, message, args) => {
        console.log(`${message.author.username} pinged the server.`);
        const msg = await message.channel.send('🏓 Pinging...');
        msg.edit(`🏓 Pong! :zap:: ${Math.floor(msg.createdAt - message.createdAt)}ms`);
    },
};