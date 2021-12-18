const {
    Client,
    Intents,
    Collection,
    Interaction
} = require("discord.js");
const {
    prefix,
    token
} = require('./config.json');
const dep = require('./deployment-commands')
const fs = require('fs');


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// ["handler"].forEach(handler => {
//     require(`./utils/${handler}`)(client);
// })

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`${client.user.username} has come online. GLHF!`);
    console.log(`Shelly is getting fucked on ${client.guilds.cache.size} servers!`);
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return; 

    const command = client.commands.get(interaction.commandName); 

    if(!command)return;

    try {
        await command.execute(interaction);
    } catch (e) {
        console.error(e); 
        await interaction.reply({ content: 'Something went wrong, try again.', ephemeral: true });
    }
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

    switch(interaction.customId){
        case 'join_inhouse':
            console.log("joined inhouse");
        case 'start_inhouse':
            console.log("started inhouse");
    }
});
// client.on("message", async message => {
//     if (message.author.bot) return;
//     if (!message.guild) return;
//     if (!message.content.startsWith(prefix)) return;
//     if (!message.member) message.member = await message.guild.fetchMember(message);

//     const args = message.content.slice(prefix.length).trim().split(/ +/g);
//     const cmd = args.shift().toLowerCase();

//     if (cmd.length === 0) return;

//     let command = client.commands.get(cmd);
//     if (command) command.run(client, message, args);
// });

client.login(token);