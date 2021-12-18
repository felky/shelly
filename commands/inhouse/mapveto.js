const Discord = require('discord.js');

module.exports = {
    name: 'mapveto',
    cooldown: 5,
    description: 'CSGO map veto.',
    run: async(client, message, args) => {

        console.log(`${message.author.username} started a map veto.`);

        const csgo = ["Mirage 1️⃣", "Nuke 2️⃣", "Dust II 3️⃣", "Cache 4️⃣", "Overpass 5️⃣", "Vertigo 6️⃣", "Inferno 7️⃣", "Train 8️⃣"];
        const csgoEmotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "▶"]
        const embeddedMessage = new Discord.MessageEmbed()
            .setColor('#0093ff')
            .setTitle(`${message.author.username} has started a map veto.`)
            .setAuthor("Vote on each maps emote to remove it from the pool, ▶ to go to next veto round.")
            .setDescription(`${csgo.toString()}`)
            .setTimestamp();

            message.channel.send(embeddedMessage).then(async msg => {

                csgoEmotes.forEach(element => {
                    msg.react(element);
            });
        });
    },
};