module.exports = {
    name: 'predict',
    cooldown: 5,
    description: 'Predicts the outcome of a game.',
    run: async(client, message, args) => {

        const csgo = [16, Math.floor(Math.random() * 16)];
        const valorant = [13, Math.floor(Math.random() * 13)];

        if (args[0] === "csgo") {
            if (csgo[1] === 15) {
                csgo[0] = 15;
            }
            await message.reply(`The final score will be: ${csgo[0]} - ${csgo[1]}`)
        } else if (args[0] === "valorant") {
            if (valorant[1] === 12) {
                valorant[0] = 12;
            }
            await message.reply(`The final score will be: ${valorant[0]} - ${valorant[1]}`)
        } else {
            await message.reply(`Incorrect input...`);
        }
    },
};