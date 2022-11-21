module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const channel = await member.guild.channels.cache.get("993179104495030294");
    channel.send(
      `Welcome <@${member.id}> to Code Of Israel's official server. You are more than welcome to introduce yourself. we're waiting... :smiley:`
    );
  },
};
