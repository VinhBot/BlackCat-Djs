const { Client, Partials, GatewayIntentBits, ActivityType } = require("discord.js");
const mongoose = require("mongoose");
require("colors");

const BlackCat = class extends Client {
  constructor(options) {
    super({
      messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      shards: "auto",
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: options.setReply,
      },
      intents: Object.keys(GatewayIntentBits),
      partials: Object.keys(Partials),
    });
    this.login(options.setToken);
    // kết nối tới mongodb 
    this.mongodbHandler(options);
  };
  readyBotEvents(options) {
    this.on("ready", () => {
      console.log(`${this.user.username} đã sẵn sàng hoạt động`.red); 
      setInterval(() => {
        this.user.setPresence({
          activities: [{ 
            name: options.setActivities[Math.floor(Math.random() * options.setActivities.length)], 
            type: options.setType || ActivityType.Playing,
          }],
          status: options.setStatus || "dnd",
        });
  	  }, options.setTime || 5000);
    });
  };
  mongodbHandler(options) { 
    mongoose.connect(options.setMongoDB, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }).then(() => {
      console.log("Bot được kết nối với cơ sở dữ liệu!".blue)
    }).catch((err) => {
      console.error(`Lỗi kết nối Mongoose: \n${err.stack}`.red);
    });
    mongoose.connection.on("disconnected", () => {
      console.warn("Kết nối Mongoose khoing thành công".red);
    });
    mongoose.set('strictQuery', false);
  };
};

module.exports.Client = BlackCat;