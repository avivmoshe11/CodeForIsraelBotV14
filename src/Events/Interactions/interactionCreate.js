const { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const createModal = require("../../Functions/createModal");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    /*if (interaction.isButton()) {
      if (interaction.customId === "looking_for_job") {
        await createModal.execute(interaction, client);
      }
    }*/
    if (!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand() && !interaction.isButton()) return;

    let command;
    if (!interaction.isButton()) {
      command = client.commands.get(interaction.commandName);
    }

    if (!command && !interaction.isButton()) {
      return interaction.reply({ content: "This command is outdated.", ephemeral: true });
    } else if (command) {
      command.execute(interaction, client);
    }

    if (interaction.isButton()) {
      //ticket Creation
      if (interaction.component.customId == "createManagementTicket" || interaction.component.customId == "createATeamTicket") {
        let mentions = `<@${interaction.user.id}> <@&997128457823731802>`;
        let overwrites = [
          { id: "993179104029446244", deny: ["ViewChannel"] }, //everyone
          { id: interaction.user.id, allow: ["ViewChannel", "SendMessages"] },
        ];

        if (interaction.component.customId == "createATeamTicket") {
          overwrites.push({ id: "1007308936564719796", allow: ["ViewChannel", "SendMessages"] });
          mentions = `<@${interaction.user.id}> <@&1007308936564719796>`;
        }

        const ch = await interaction.channel.parent.children.create({
          name: `Ticket-${client.ticketId.content}`,
          permissionOverwrites: overwrites,
        });

        interaction.reply({ ephemeral: true, content: `Ticket Opened No.${client.ticketId.content} at <#${ch.id}>` });
        const embeddedMessage = new EmbedBuilder()
          .setColor("#04a2d5")
          .setTitle(`Our Team Will Show Up Shortly`)
          .setDescription(`<@${interaction.user.id}> Welcome to our ticket system, our team will be with you shortly!`)
          .setFooter({
            text: "made by Aviv#1234",
            iconURL: "https://static.euronews.com/articles/stories/05/79/99/44/2000x1333_cmsv2_292bef7f-8fab-5f0d-bed5-63856832498b-5799944.jpg",
          });
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId(`closeTicket`).setStyle(ButtonStyle.Danger).setLabel("💥 Close Ticket"),
          new ButtonBuilder().setCustomId(`openTicket`).setStyle(ButtonStyle.Success).setLabel("🔷 Re-Open Ticket").setDisabled(true)
        );

        ch.send(`|| ${mentions} ||`);
        ch.send({ embeds: [embeddedMessage], components: [row] });
        client.ticketId.edit(`${parseInt(client.ticketId.content) + 1}`);
      }

      //ticket Closure

      if (interaction.component.customId == "closeTicket") {
        //set the button to be disabled.
        const editedCloseButton = ButtonBuilder.from(interaction.component).setDisabled(true);

        //allowing re-open button.
        const editedOpenButton = ButtonBuilder.from(interaction.message.components[0].components[1]).setDisabled(false);

        const editedRow = new ActionRowBuilder().addComponents(editedCloseButton, editedOpenButton);
        //applying changes
        await interaction.update({ components: [editedRow] });

        let timeLeft = 3;
        const originalEmbed = new EmbedBuilder().setDescription(`Channel deleting in ${timeLeft}s`).setColor("#FF0000");
        const msg = await interaction.channel.send({ embeds: [originalEmbed] });

        const deleteTimer = setInterval(async () => {
          if (timeLeft < 1) {
            interaction.channel.delete();
            clearInterval(deleteTimer);
          } else {
            const newEmbed = new EmbedBuilder().setDescription(`Channel deleting in ${timeLeft - 1}s`).setColor("#FF0000");
            msg.edit({ embeds: [newEmbed] });
            timeLeft -= 1;
          }
        }, 1000);
        client.intervals[interaction.message.id] = deleteTimer;
      }

      //ticket Re-opened

      if (interaction.component.customId == "openTicket") {
        if (client.intervals[interaction.message.id]) {
          clearInterval(client.intervals[interaction.message.id]);
        }

        const embeddedMessage = new EmbedBuilder().setDescription("✅ Ticket Re-Opened").setColor("#00FF00");
        interaction.channel.send({ embeds: [embeddedMessage] });

        //set the button to be disabled.
        const editedCloseButton = ButtonBuilder.from(interaction.component).setDisabled(true);

        //allowing re-open button.
        const editedOpenButton = ButtonBuilder.from(interaction.message.components[0].components[0]).setDisabled(false);

        const editedRow = new ActionRowBuilder().addComponents(editedOpenButton, editedCloseButton);
        //applying changes
        await interaction.update({ components: [editedRow] });
      }
    }
  },
};
