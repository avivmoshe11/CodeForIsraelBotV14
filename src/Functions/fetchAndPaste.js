module.exports = {
  name: "fetchAndPaste",
  description: "fetches messages from channel and pasting in a new channel",
  run: async (designateChannel, templateChannel) => {
    const messages = await templateChannel.messages.fetch({ limit: 100 });

    if (messages) {
      await messages.reverse();
      messages.forEach(async (message) => {
        if (message.content != "") {
          await designateChannel.send(message.content);
        }

        if (message.attachments.size > 0) {
          //console.log(message.attachments.first());
          await designateChannel.send({
            files: [message.attachments.first()],
          });
        }

        if (message.embeds.size > 0) {
          //console.log(message.embeds.first());
          await designateChannel.send({
            embeds: [message.embeds.first()],
          });
        }
      });
    }
  },
};
