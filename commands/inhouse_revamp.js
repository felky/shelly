const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inhouse')
        .setDescription('Create a 5v5 inhouse.'),
    async execute(interaction){
        const interactionStarter = interaction.user; 

        let inhouseStarted = false;

        const embeddedMessage = new MessageEmbed()
        .setColor('#0093ff')
        .setThumbnail(interactionStarter.displayAvatarURL({ format: 'png' }))
        .setTitle(`${interactionStarter.username.toString()} has started an inhouse.`)
        .setDescription('Joined Players: ')
        .setTimestamp();

		let row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('join_inhouse')
					.setLabel('Join')
					.setStyle('PRIMARY')
			)
            .addComponents(
                new MessageButton()
                    .setCustomId('start_inhouse')
                    .setLabel('Start')
                    .setStyle('SUCCESS'),
            );

        await interaction.reply({
            embeds: [embeddedMessage],
            components: [row]
        });
    }
};


function checkIfUserJoined(user, userList) {
    return userList.contains(user.id) ? true : false;
}

