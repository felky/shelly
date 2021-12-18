const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');

const ascii = require("ascii-table");
let table = new ascii("Shelly");
table.setHeading("Commands", "Load status");

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    if (command.data) {
        commands.push(command.data.toJSON());
        table.addRow(file, '😀');
    } else {
        table.addRow(file, `💀  -> missing a help.name, or help.name is not a string.`);
        continue;
    }

    if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log(table.toString()))
	.catch(console.error);