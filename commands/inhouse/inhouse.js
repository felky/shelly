const Discord = require('discord.js');

module.exports = {
    name: 'inhouse',
    cooldown: 5,
    description: 'Start an inhouse.',
    run: async(client, message, args) => {
        var inhouse_team1 = [];
        var inhouse_team2 = [];
        var seen_user_ids = [];
        var seen_user_names = [];

        console.log(`${message.author.username} started an inhouse.`);

        const embeddedMessage = new Discord.MessageEmbed()
            .setColor('#0093ff')
            .setTitle(`${message.author.username} has started an inhouse.`)
            .setAuthor("React with 👍 to join and ✔ to finish!")
            .setTimestamp();

        const filter = (reaction, user) => {
                return ['👍', '✔'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        message.channel.send(embeddedMessage).then(async msg => {

            msg.react('👍');
            msg.react('✔');

            client.on('messageReactionAdd', (reaction, user) => {
                if (reaction.emoji.name === '👍') {
                    if(reaction.users.cache.last().id === "610905633419427856") return;
                    if(seen_user_ids.includes(reaction.users.cache.last().id)) return;

                    seen_user_ids.push(reaction.users.cache.last().id);
                    seen_user_names.push(reaction.users.cache.last().username);

                    let exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0093ff')
                    .setTitle(`${message.author.username} has started an inhouse.`)
                    .setAuthor("React with 👍 to join and ✔ to finish!")
                    .setDescription(`Joined users: ${seen_user_names.toString()}`)
                    .setTimestamp();

                    msg.edit(exampleEmbed);
                    console.log(seen_user_ids);
                    console.log(seen_user_names);
                } 

                if (reaction.emoji.name === '✔') {
                    if(reaction.users.cache.last().id === "610905633419427856") return;
                
                    inhouse_team1 = shuffle(seen_user_names);
                    var half = Math.ceil(inhouse_team1.length / 2);
                    inhouse_team2 = inhouse_team1.splice(0, half);
                    
                    if(inhouse_team1.length >= 1 && inhouse_team2.length >= 1){
                        const finishedTeamEmbed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle(`${message.author.username}'s inhouse.`)
                        .addFields(
                            { name: 'Team 1', value: `${inhouse_team1.toString()}`, inline: true },
                            { name: 'Team 2', value: `${inhouse_team2.toString()}`, inline: true },
                        );
    
                        msg.delete();

                        return message.channel.send(finishedTeamEmbed);
                    } else if (inhouse_team1.length < 1 && inhouse_team2.length < 2) {
                        return message.channel.send("Not enough players.");
                    } else {
                        return console.log("Something goofed up");
                    }


                }

                function shuffle(array) {
                    var currentIndex = array.length, temporaryValue, randomIndex;  
                    while (0 !== currentIndex) {
            
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                    }
            
                    return array;
                }
            });
        });
    },
};