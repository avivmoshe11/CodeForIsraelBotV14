const client = require("../../bot");
const confirmProjectName = require("../../Functions/confirmProjectName");

module.exports = {
  name: "messageCreate",
  async execute(msg) {
    if (msg.channel.name == "set-project" && !msg.author.bot) {
      if (client.canOpenNewProject) {
        client.canOpenNewProject = false;
        if ((await confirmProjectName.run(client, msg)) == true) console.log("pressed n or y");
        client.canOpenNewProject = true;
      }
    }
  },
};
