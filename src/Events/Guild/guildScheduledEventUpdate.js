const client = require("../../bot");

module.exports = {
  name: "guildScheduledEventUpdate",
  async execute(oldEventState, newEventState) {
    if (newEventState.status == 3 && newEventState.name.toLowerCase().startsWith("weekly")) {
      const newStartTime = newEventState.scheduledStartTimestamp + 604800000;
      client.guilds.cache.first().scheduledEvents.create({
        name: newEventState.name,
        scheduledStartTime: newStartTime,
        privacyLevel: 2,
        entityType: 2,
        description: newEventState.description ? newEventState.description : "",
        channel: newEventState.channelId,
      });
    }
  },
};
