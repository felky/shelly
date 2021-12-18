module.exports = {
    name: '8ball',
    cooldown: 5,
    description: 'The ball of truth.',
    run: async(client, message, args) => {


        var responses = ["Nope.", "Yes.", "Maybe?",
            "Absolutely!", "Not at the moment.",
            "Extremely", "Tomorrow.", "Absolutely not!",
            "You must be kidding.", "Sometime soon"
        ];

        await message.channel.send(`:8ball: ${responses[Math.floor(Math.random() * (responses.length - 1))]}`);



    },
};