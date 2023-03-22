# BlackCat-Package
BlackCat-Club DiscordBot 🌚

```js
const { ActivityType } = require("discord.js");
const Client = require("blackcat-djs");
const handlers = new Client({
  setLanguage: "vi", // Set language for package include: vi, en
  setReply: false, // set reply mode for bot
  setToken: "bot token", // bot's token
  setConnectMongoDB: true, // If you don't use it you can turn it off 
  setMongoDB: "mongourl", // mongourl
});
// see if the bot is online or not
handlers.on("ready", () => {
  console.log(`${handlers.user.username} is ready`.red); 
  const setActivities = [
    `${handlers.guilds.cache.size} Guilds, ${handlers.guilds.cache.map(c => c.memberCount).filter(v => typeof v === "number").reduce((a, b) => a + b, 0)} member`,
    `BlackCat-Club`
  ];
  setInterval(() => {
    handlers.user.setPresence({
      activities: [{
        name: setActivities[Math.floor(Math.random() * setActivities.length)], 
        type: ActivityType.Playing
      }],
      status: 'dnd',
    });
  }, 5000);
});
// Launch Events
// you can skip this step to use the events of the package including interactionCreate, messageCreate
handlers.eventHandler({
  EventPath: `${process.cwd()}/Events/Guild`, // path of events
  Events: ["Guilds"] // folder name
});
// launch slash commands (/)
handlers.slashHandler({
  setHandlerInteraction: true, // toggle support interactionCreate || If you turn off this feature, you will have to manually create discord's custom interactionCreate
  setDeveloper: "id owner", // id of owner || if setHandlerInteraction: false, then this will be useless :))
  setSlashCommandPath: `${process.cwd()}/path/commands`, // path to slashCommands file
});
// launch prefix commands
handlers.commandHandler({
  setHandlerMessageCreate: false, // enable or disable the package's messageCreate
  setPrefix: "!", // if when disable setHandlerMessageCreate: false, this is useless
  setCommandPath: `${process.cwd()}/path/commands` // set path to commands
});
```
# slashCommands 
```js
const { ApplicationCommandOptionType } = require("discord.js");
const path = require("node:path");
module.exports = {
  name: path.parse(__filename).name,
  description: "", // Command Description
  userPerms: [], // user permissions can use commands
  owner: false, // true to change to the command of the bot owner, false to turn off
  options: [
    { 
      name: "Subccommand", 
      description: "_", 
      type: ApplicationCommandOptionType.Subcommand, 
      options: [{
        name: "String", 
        description: "_", 
        type: ApplicationCommandOptionType.String,
        required: true, 
        choices: [
          { name: "name", value: "value" },
          { name: "name", value: "value" },
        ],
      }],
    },
  ],
  run: async(client, interaction) => {
   
  },
};
```