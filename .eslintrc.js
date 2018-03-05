module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest": true
    },
    "globals": {
        "subject": true,
        "Subject": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};