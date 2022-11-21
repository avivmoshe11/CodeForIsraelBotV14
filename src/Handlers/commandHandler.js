require("dotenv").config();
const ascii = require("ascii-table");
const fs = require("fs");

function loadCommands(client) {
  const table = new ascii().setHeading("Commands", "Status");
  let commandsArray = [];
  let developerArray = [];

  const commandsFolder = fs.readdirSync("./src/Commands");
  for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./src/Commands/${folder}`).filter((file) => file.endsWith("js"));
    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);
      client.commands.set(commandFile.data.name, commandFile);

      if (commandFile.developer) {
        developerArray.push(commandFile.data.toJSON());
      } else {
        commandsArray.push(commandFile.data.toJSON());
      }

      table.addRow(file, "  🟢");
      continue;
    }
  }

  client.application.commands.set(commandsArray);
  //const developerGuild = client.guilds.cache.get(process.env.DEV_GUILD);
  //developerGuild.commands.set(developerArray);
  return console.log(table.toString(), "Loaded Commands");
}

module.exports = { loadCommands };
