const { ChannelType } = require("discord.js");
const fetchAndPaste = require("./fetchAndPaste");
const initiateTemplateCategory = require("./initiateTemplateCategory");

module.exports = {
  name: "setPermsAndSync",
  description: "setting project's perms and sync from template",
  run: async (category, projectRole, projectPartnerRole, client) => {
    await category.permissionOverwrites.edit(projectRole.id, { ViewChannel: true });
    await category.permissionOverwrites.edit("993590149734739978", { ManageChannels: true, ManageRoles: true });
    await category.permissionOverwrites.edit("993594812597014538", { ViewChannel: false });
    await category.permissionOverwrites.edit("993594855181779074", { ViewChannel: false });

    const welcome = await category.children.create({ name: "〔👋〕Welcome" });
    const notifications = await category.children.create({ name: "〔📌〕Notifications" });
    const partners = await category.children.create({
      name: "〔🤝〕Partners",
      permissionOverwrites: [
        { id: projectPartnerRole, allow: ["ViewChannel"] },
        { id: projectRole, allow: ["ViewChannel"] },
        { id: "993590149734739978", allow: ["ManageChannels", "ManageRoles"] },
        { id: "993594812597014538", deny: ["ViewChannel"] },
        { id: "993594855181779074", deny: ["ViewChannel"] },
      ],
    });
    const open = await category.children.create({ name: "〔💬〕Open Chat" });
    const documents = await category.children.create({ name: "〔📄〕Documents" });
    const meeting = await category.children.create({
      name: `〔🔊〕${projectRole.name.split(" ")[0]} meeting`,
      type: ChannelType.GuildVoice,
      permissionOverwrites: [
        { id: projectPartnerRole, allow: ["ViewChannel"] },
        { id: projectRole, allow: ["ViewChannel"] },
        { id: "993590149734739978", allow: ["ManageChannels", "ManageRoles"] },
        { id: "993594812597014538", deny: ["ViewChannel"] },
        { id: "993594855181779074", deny: ["ViewChannel"] },
      ],
    });

    //prepare the channels
    const newProjectChannels = [welcome, notifications, partners, open, documents];
    const templateCat = await initiateTemplateCategory.run(client); //.run

    //activating fetchAndPaste
    for (let child of templateCat) {
      for (let i = 0; i < newProjectChannels.length; i++) {
        if (child[1].name == newProjectChannels[i].name) {
          await fetchAndPaste.run(newProjectChannels[i], child[1]); //.run
        }
      }
    }
  },
};
