const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-ticket")
    .setDescription("ticket home page")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    interaction.reply({ content: "Initiating ticket master", ephemeral: true });
    const embeddedMessage = new EmbedBuilder()
      .setColor("#04a2d5")
      .setTitle(`Welcome To Code For Israel's Ticket Tool System`)
      .setDescription(`Simply click on the button below and a private chat will be opened between you and the server's management and support teams`)
      .setFooter({
        text: "made by Aviv#1234",
        iconURL: "https://static.euronews.com/articles/stories/05/79/99/44/2000x1333_cmsv2_292bef7f-8fab-5f0d-bed5-63856832498b-5799944.jpg",
      });
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`createTicket`).setStyle(ButtonStyle.Primary).setLabel("Click To Start New Ticket").setEmoji("💌")
    );
    interaction.channel.send({ embeds: [embeddedMessage], components: [row] });
  },
};
