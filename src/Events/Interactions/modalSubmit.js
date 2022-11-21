const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "modalSubmit",
  async execute(modal, client) {
    const fullName = modal.getTextInputValue("name");
    const linkedIn = modal.getTextInputValue("linkedIn");
    const github = modal.getTextInputValue("github");
    const jobTypes = modal.getTextInputValue("jobtypes");
    await modal.deferReply({ ephemeral: true });
    modal.editReply({ content: "sent" });
    const channel = await modal.member.guild.channels.cache.get("987667220345782333");
    channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle(fullName)
          .setDescription(`**Tags: ${jobTypes}**`)
          .setColor("#00FFFF")
          .setFields([
            { name: "LinkedIn: ", value: linkedIn },
            { name: "Github:", value: github ? github : "--" },
          ]),
      ],
    });
  },
};
