const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("lfj")
    .setDescription("looking for job panel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    interaction.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("Looking For Job")
          .setDescription("Press the button to submit information about yourself to employers.")
          .setColor("#00FFFF"),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId("looking_for_job").setEmoji("<:peepoDetective:1007339449069338755>").setStyle(ButtonStyle.Primary)
        ),
      ],
    });
  },
};
