const axios = require('axios');
const RiotAPI_token = process.env.RIOT_KEY;

module.exports = {
    name: 'currentgame',
    cooldown: 10,
    description: 'Pings user when the players game is finished',
    run: async (client, message, args) => {

        // TODO: Get actual version from DDragon
        var currentVersion = '10.21.1';

        var bans;
        var bansId;
        var usernameUnparsed = args.toString();  

        var username = usernameUnparsed.replace(/,/g, '%20');

        await axios
            .all([
                axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${RiotAPI_token}`)
                .then(res => {
                    return res.data;
                })
                .then(result => {
                    axios.get(`https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${result.id}?api_key=${RiotAPI_token}`)
                    .then(res => {
                        console.log(res.status);
                        switch(res.status){
                            case 401:
                                message.reply("You do not have permission to call the Riot API")
                                break;
                            case 404: 
                                message.reply(`Player ${args} is currently not in a game.`)
                                break;
                            case 200:
                                console.log(res.bannedChampions)

                                var timestamp = res.data.gameLength;
                                var hours = Math.floor(timestamp / 60 / 60);
                                var minutes = Math.floor(timestamp / 60) - (hours * 60);
                                var seconds = timestamp % 60;
                                var formatted = hours + ':' + minutes + ':' + seconds;
                                message.reply(`Player ${args} is currently in a game (${formatted}) playing ${res.bannedChampions}`);
                                break;
                        }
                    })
                })
                .catch(error => {
                    console.error(error);
                }),
            ]);

            

        
        /*
        await axios.get(`http://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/en_US/champion.json`)
        .then( res => {
            bans.forEach(element => {
                
            });
        })
        .catch(error => {
            console.error(error);
        })

        
        let teamEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`${args} current game. (${formatted})`)
        .addFields({
            name: 'Blue Side',
            value: `
            ${args}
            `,
            inline: true
        }, {
            name: 'Red Side',
            value: `${inhouse_team2.toString()}`,
            inline: true
        }, );
        */
    },
};