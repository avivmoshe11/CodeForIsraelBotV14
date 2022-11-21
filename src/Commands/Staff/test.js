const { SlashCommandBuilder, ChatInputCommandInteraction, CommandInteraction, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("test").setDescription("Test").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    interaction.reply({ content: "Test good!", ephemeral: true });
  },
};
