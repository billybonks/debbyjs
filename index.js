i18n = require("i18n");
i18n.configure({
    locales:['en'],
    directory: './locales',
    updateFiles: false,
});

require('dotenv').config()

app = require('./api/index.js');

Bot = require('./bot');

// bot.use(removeSinglish);
// bot.use(extractLocation);

if(process.env.SHELL === "true"){
  ShellAdapter = require('./bot/transports/shell');
  shellAdapter = new ShellAdapter(Bot);
  shellAdapter.run(app);
} else {
  FacebookAdapter = require('./bot/transports/facebook');
  facebookAdapter = new FacebookAdapter(Bot, process.env.FB_PAGE_ID, process.env.FB_PAGE_TOKEN);
  facebookAdapter.run(app);
}

app.listen(8080)
