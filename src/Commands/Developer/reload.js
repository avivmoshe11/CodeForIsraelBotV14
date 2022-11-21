const { SlashCommandBuilder, ChatInputCommandInteraction, CommandInteraction, PermissionFlagsBits } = require("discord.js");

const { loadEvents } = require("../../Handlers/eventHandler");
const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload event/commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options.setName("events").setDescription("Reload your events"))
    .addSubcommand((options) => options.setName("commands").setDescription("Reload your commands")),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case "events":
        {
          loadEvents(client);
          interaction.reply({ content: "Reloaded the events", ephemeral: true });
        }
        break;
      case "commands":
        {
          loadCommands(client);
          interaction.reply({ content: "Reloaded the commands", ephemeral: true });
        }
        break;
    }
  },
};
