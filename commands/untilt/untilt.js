module.exports = {
    name: 'untilt',
    cooldown: 5,
    description: 'Untilt the boys.',
    run: async(client, message, args) => {
        await message.channel.send(`Nu har ${args} skämt ut sig själv igen... 😐`);
    },
};