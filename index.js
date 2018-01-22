i18n = require("i18n");
i18n.configure({
    locales:['en'],
    directory: './locales',
    updateFiles: false,
});

require('dotenv').config()
app = require('./api/index.js');

Bot = require('./bot');
FacebookAdapter = require('./bot/transports/facebook');
facebookAdapter = new FacebookAdapter(Bot);
facebookAdapter.run(app);

app.listen(8080);
