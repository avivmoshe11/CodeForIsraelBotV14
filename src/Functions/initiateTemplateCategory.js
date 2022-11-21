module.exports = {
  name: "initiateTemplateCategory",
  description: "initiates the template category refs",
  run: async (client) => {
    const guild = await client.guilds.cache.first();
    const templateCat = guild.channels.cache.get("996785116720398469");
    console.log(templateCat);
    let children = await guild.channels.cache.filter((c) => c.parentId == templateCat.id);
    children = children.filter((c) => c.type == 0);
    return children;
  },
};
