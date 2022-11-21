require("dotenv").config();

const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");

const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildScheduledEvents } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildScheduledEvents],
  partials: [User, Message, GuildMember, ThreadMember],
});
require("discord-modals")(client);
client.commands = new Collection();
client.projects = new Array();
client.canOpenNewProject = true;

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

client.login(process.env.TOKEN).then(() => {
  loadEvents(client);
  loadCommands(client);
});

module.exports = client;
