const { UserContextMenuCommandInteraction, ContextMenuCommandBuilder, PermissionFlagsBits, ApplicationCommandType } = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Report")
    //.addSubcommand((options) => options.setName("option1"))
    .setType(ApplicationCommandType.Message),
  /**
   *
   * @param {MessageContextMenuCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const guild = await client.guilds.cache.get(interaction.guildId);
    const channel = await guild.channels.cache.get("987667145473269770");
    const message = interaction.options.getMessage("message", true);
    const content = message?.content;
    const reportedUser = message.author;
    console.log(interaction.member);
    await channel.send({ content: `User: <@${interaction.user.id}> reported ${reportedUser} for: **${content}**` });
    await interaction.member.roles.add("1005091853093306500");

    interaction.reply({ content: "Reported Successfully!", ephemeral: true });
  },
};
