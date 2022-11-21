module.exports = {
  name: "channelCreate",
  async execute(channel) {
    console.log(`new channel created: ${channel.name}`);
    if (channel.type == 4 && channel.name.toLowerCase() == "newproject") {
      const ch = await channel.children.create({
        name: "Set Project",
        permissionOverwrites: [
          {
            id: "993179104029446244",
            deny: ["ViewChannel"],
          },
        ],
      });
      ch.send("Please insert project name");
    }
  },
};
