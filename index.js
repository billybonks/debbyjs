i18n = require("i18n");
i18n.configure({
    locales:['en'],
    directory: './locales',
    updateFiles: false,
});

require('dotenv').config()
app = require('./api/index.js');

app.listen(8080)
