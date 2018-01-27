i18n = require("i18n");
i18n.configure({
    locales:['en'],
    directory: './locales',
    updateFiles: false,
});

require('dotenv').config()

app = require('./api/index.js');

Bot = require('./bot');
Brain = require('./bot/brain');
let robot = new Bot('chope', new Brain());
// bot.use(removeSinglish);
// bot.use(extractLocation);

if(process.env.SHELL_MODE === "true"){
  ShellAdapter = require('./bot/adapter/shell');
  shellAdapter = new ShellAdapter(robot);
  shellAdapter.run(app);
} else {
  FacebookAdapter = require('./bot/adapter/facebook');
  facebookAdapter = new FacebookAdapter(robot, process.env.FB_PAGE_ID, process.env.FB_PAGE_TOKEN);
  facebookAdapter.run(app);
}

app.listen(8080)
