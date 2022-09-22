const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song"),

	execute: async ({ client, interaction }) => {

        // Get the queue for the server
		const queue = client.player.getQueue(interaction.guildId)

        // If there is no queue, return
		if (!queue)
        {
            await interaction.reply("There are no songs in the queue");
            return;
        }
        // Skip the current song
        
        const currentSong = queue.current

		queue.setPaused(true)
        // Return an embed to the user saying the song has been skipped
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`Song has been paused!`)
                    .setThumbnail(currentSong.setThumbnail)
            ]
        })
	},
}