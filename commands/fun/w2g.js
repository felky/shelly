const axios = require('axios')
let ytRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/

module.exports = {
    name: 'w2g',
    cooldown: 30,
    description: 'Starts and links a new Watch2Gether page.',
    run: async(client, message, args) => {
        var streamkey = ""; 
        
        if(args[0].match(ytRegex)){
            console.log(`found video, adding ${args[0]} to videos`);
            var body = {
                "w2g_api_key": process.env.W2G_KEY,
                "share": args[0]
            }
        } else {
            var body = {
                "w2g_api_key": process.env.W2G_KEY
            }
        }

        await axios
        .post('https://w2g.tv/rooms/create.json', body)
        .then(res => {
            streamkey = res.data.streamkey;
        })
        .catch(error => {
            console.error(error)
        })

        await message.channel.send(`Room served at: https://w2g.tv/rooms/${streamkey}`)
    },
};