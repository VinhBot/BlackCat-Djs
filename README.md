# BlackCat-Package
BlackCat-Club DiscordBot 🌚

```js
const { ActivityType } = require("discord.js");
const Client = require("blackcat-djs");
const handlers = new Client({
  setLanguage: "vi", // Set language for package include: vi, en
  setReply: false, // set reply mode for bot
  setToken: "bot token", // bot's token
  setDeveloper: "id owner", // id of owner
});
// see if the bot is online or not
handlers.on("ready", () => {
  console.log(`${handlers.user.username} is ready`.red); 
});
```
# DiscordEvents 
```js
// Launch Events
// you can skip this step to use the events of the package including interactionCreate, messageCreate
// If you use it, take it out
// index.js
handlers.eventHandler({
  EventPath: `${process.cwd()}/Events/Guild`, // path of events
  Events: ["Guilds"] // folder name
});
// messageCreate.js
module.exports = (client, message) => {
  // code
};

```
# Commands 
```js
// index.js
// launch prefix commands
handlers.commandHandler({
  setHandlerMessageCreate: true, // enable or disable the package's messageCreate
  setPrefix: "!", // if when disable setHandlerMessageCreate: false, this is useless
  setCommandPath: `${process.cwd()}/path/commands` // set path to commands
});
// file cmds 
const path = require("node:path");
module.exports = {
  name: path.parse(__filename).name,
  usage: `${path.parse(__filename).name}`,
  aliases: [""], // sub-command
  description: "", // command description
  userPerms: [], // Administrator, ....
  owner: false, // toggle commands specific to bot owners
  category:"", // folder name containing the command
  run: async(client, message, args, prefix) => {
  
  },
};
```
# slashCommands 
```js
// index.js
// launch slash commands (/)
handlers.slashHandler({
  setHandlerInteraction: true, // toggle support interactionCreate || If you turn off this feature, you will have to manually create discord's custom interactionCreate
  setSlashCommandPath: `${process.cwd()}/path/commands`, // path to slashCommands file
});
// file cmds
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