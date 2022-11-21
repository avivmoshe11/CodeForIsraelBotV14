const { SlashCommandBuilder, ChatInputCommandInteraction, CommandInteraction, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aviv-secret-roll-back")
    .setDescription("Removes completely a project categories")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    interaction.reply({ content: "Initiating roll back", ephemeral: true });
    try {
      const cat = await interaction.channel.parent;
      let projectName = cat.name.slice(5, -5);
      let wip = interaction.guild.channels.cache.filter((c) => c.name == `wip - ${projectName}`);
      await wip.first().delete();

      let memberRole = interaction.guild.roles.cache.filter((r) => r.name == `${projectName} member`);
      await memberRole.first().delete();
      let partnerRole = interaction.guild.roles.cache.filter((r) => r.name == `${projectName} partner`);
      await partnerRole.first().delete();
      let children = interaction.guild.channels.cache.filter((c) => c.parentId == cat.id);
      children.forEach(async (channel) => await channel.delete());
      client.projects = client.projects.filter((project) => project != projectName);
      await cat.delete();
    } catch {
      interaction.channel.send("category isn't a project");
    }
  },
};
