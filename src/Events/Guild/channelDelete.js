const client = require("../../bot");

module.exports = {
  name: "channelDelete",
  async execute(channel) {
    if (channel.name.toLowerCase() == "set-project" && channel.type == 0) {
      client.canOpenNewProject = true;
    }
  },
};
