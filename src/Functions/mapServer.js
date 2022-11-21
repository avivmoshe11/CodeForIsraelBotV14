module.exports = {
  name: "mapServer",
  description: "function for the Dev",
  aliases: ["map"],
  run: (guild) => {
    let channels = guild.channels.cache;
    let voiceChannels = [];
    let textChannels = [];
    let categories = [];
    for (let channel of channels) {
      if (channel[1].type == 0) {
        textChannels.push({ name: channel[1].name, id: channel[0], channel_type: "text", parent_id: channel[1].parentId, pointer: channel[1] });
      } else if (channel[1].type == 2) {
        voiceChannels.push({ name: channel[1].name, id: channel[0], channel_type: "voice", parent_id: channel[1].parentId, pointer: channel[1] });
      } else if (channel[1].type == 4) {
        categories.push({ name: channel[1].name, id: channel[0], channel_type: "category", pointer: channel[1], children: [] });
      }
    }
    let fixedCategories = filterCatChilds(textChannels, voiceChannels, categories);
    return fixedCategories;
  },
};

function filterCatChilds(textChannels, voiceChannels, categories) {
  //console.log(textChannels);
  for (let k = 0; k < categories.length; k++) {
    for (let i = 0; i < textChannels.length; i++) {
      if (textChannels[i].parent_id == categories[k].id) {
        categories[k].children.push(textChannels[i]);
      }
    }
    for (let j = 0; j < voiceChannels.length; j++) {
      if (voiceChannels[j].parent_id == categories[k].id) {
        categories[k].children.push(voiceChannels[j]);
      }
    }
  }
  return categories;
}
