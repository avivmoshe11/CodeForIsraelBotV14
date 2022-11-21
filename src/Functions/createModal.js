const { Modal, TextInputComponent, showModal } = require("discord-modals");

module.exports = {
  name: "createModal",
  async execute(interaction, client) {
    showModal(
      new Modal().setCustomId("looking_for_job_modal").setTitle("Looking For Job").addComponents(
        new TextInputComponent()
          .setCustomId(`name`)
          .setLabel("Full Name")
          .setStyle("SHORT")
          .setMinLength("2")
          .setPlaceholder("Write your full name here")
          .setRequired(true),

        new TextInputComponent()
          .setCustomId(`linkedIn`)
          .setLabel("LinkedIn")
          .setStyle("SHORT")
          .setMinLength("2")
          .setPlaceholder("Attach LinkedIn")
          .setRequired(true),

        new TextInputComponent()
          .setCustomId(`github`)
          .setLabel("Github")
          .setStyle("SHORT")
          .setMinLength("2")
          .setPlaceholder("Attach github")
          .setRequired(false),

        new TextInputComponent()
          .setCustomId(`jobtypes`)
          .setLabel("Job types you'd like to apply to")
          .setStyle("LONG")
          .setMinLength("2")
          .setPlaceholder("Format: FullStack Developer - React, JavaScript, Node.js, etc..")
          .setRequired(true)
      ),
      {
        client: client,
        interaction: interaction,
      }
    );
  },
};
