const {
    Client,
    Collection
} = require("discord.js");
const {
    prefix,
    token
} = require('./config.json');
const fs = require('fs');

const client = new Client();
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

["handler"].forEach(handler => {
    require(`./utils/${handler}`)(client);
})

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.username}, GLHF!`);
    console.log(`Shelly is being used on ${client.guilds.cache.size} servers!`);
});

client.on("message", async message => {
    const prefix = "?";
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (command) command.run(client, message, args);
});

client.login(token);