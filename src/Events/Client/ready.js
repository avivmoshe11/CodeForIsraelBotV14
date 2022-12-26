const mapServer = require("../../Functions/mapServer");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const guild = await client.guilds.cache.get("993179104029446244");
    const categories = mapServer.run(guild);
    for (const category of categories) {
      if (category.name.startsWith("wip")) {
        client.projects.push(category.name.slice(6).toLowerCase());
      }
    }
    client.ticketId = await client.guilds.cache.first().channels.cache.get("1010901260880330872").messages.fetch("1044728384485339146");
    console.log("ready!");
    console.log(`Client is now logged in as ${client.user.username}`);
  },
};
