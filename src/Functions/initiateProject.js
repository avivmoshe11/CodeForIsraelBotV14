const { ChannelType } = require("discord.js");
const setPermsAndSync = require("./setPermsAndSync");

module.exports = {
  name: "initiateProject",
  description: "initiates a new project",
  run: async (client, msg) => {
    let projectName = msg.content;
    msg.channel.parent.setName(`┏━━━━${projectName}━━━━┓`);
    let projectRole = await msg.guild.roles.create({ name: `${projectName} member` });
    let projectPartnerRole = await msg.guild.roles.create({ name: `${projectName} partner` });
    const wipcat = await msg.guild.channels.create({
      name: `wip - ${projectName}`,
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        { id: projectRole.id, allow: ["ViewChannel", "ManageChannels", "ManageRoles"] },
        { id: "993179104029446244", deny: ["ViewChannel"] },
      ],
    });
    setPermsAndSync.run(msg.channel.parent, projectRole, projectPartnerRole, client);
    client.projects.push(projectName.toLowerCase());
    msg.channel.delete();
  },
};
