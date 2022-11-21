const { CommandInteraction } = require("discord.js");
const createModal = require("../../Functions/createModal");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (interaction.isButton()) {
      if (interaction.customId === "looking_for_job") {
        await createModal.execute(interaction, client);
      }
    }
    if (!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return interaction.reply({ content: "This command is outdated.", ephemeral: true });
    }

    command.execute(interaction, client);
  },
};
