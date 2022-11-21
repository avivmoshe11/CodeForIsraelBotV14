const initiateProject = require("./initiateProject");

module.exports = {
  name: "confirmProjectName",
  description: "project name confirmation system",
  run: async function myfunc(client, msg) {
    try {
      let response;
      console.log(msg);
      let message = await msg.channel.send(`Do you confirm "**${msg.content}**" is the name of your new project? (y/n)`);
      const responses = await message.channel.awaitMessages({ max: 1 }).then((collected) => (response = collected));
      console.log(response.first().content);
      if (response.first().content.toLowerCase() == "y") {
        console.log("awesome");

        if (!doesProjectExists(client, msg.content)) {
          initiateProject.run(client, msg);
          return true;
        }

        await msg.channel.send("The project name you provided is already taken. please insert project name");
        return true;

        //initiateProject
      } else if (response.first().content.toLowerCase() == "n") {
        await msg.channel.send("Please insert project name");
        return true;
      } else {
        return await myfunc(client, msg);
      }
    } catch (err) {
      console.log("channel deleted");
    }
  },
};

function doesProjectExists(client, projectName) {
  if (client.projects.find((project) => project == projectName)) {
    return true;
  }
  return false;
}
