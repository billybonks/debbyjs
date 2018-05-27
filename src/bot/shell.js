const Bot = require('./bot');

const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const cline = require('cline');
const chalk = require('chalk');

const historySize =  1024;

const historyPath = '.bot_history';

const { MessageText } = require('../messages');

class ShellBot extends Bot {

  send (messages) {
    if (messages instanceof Array) {
      // eslint-disable-line no-empty
    } else {
      console.log(chalk.bold(`${messages.text}`)); // eslint-disable-line no-console
    }
  }

  run () {
    this.buildCli();

    loadHistory((error, history) => {
      if (error) {
      //console.log(error.message)
      }

      this.cli.history(history);
      this.cli.interact(`${this.hardDrive.name}> `);
    });
  }

  shutdown () {
    return process.exit(0);
  }

  getRemoteUser() {
    return this.user;
  }

  constructUserId(data){
    return `shell-${data.sender}`;
  }


  buildMessageObject(data) {
    return new MessageText(data.text);
  }

  buildCli () {
    this.cli = cline();

    this.cli.command('*', (input) => {
      let userId = process.env.SHELL_USER_ID || '1';
      if (userId.match(/A\d+z/)) {
        userId = parseInt(userId);
      }

      const userName = process.env.SHELL_USER_NAME || 'Shell'; // eslint-disable-line no-unused-vars
      this.receive({text: input, recipient:this.hardDrive.name, sender: userId}).catch( (error) => {
        console.log(error);// eslint-disable-line no-console
      });
    });

    this.cli.command('history', () => {
    //  Array.from(this.cli.history()).map(item => console.log(item))
    });

    this.cli.on('history', item => {
      if (item.length > 0 && item !== 'exit' && item !== 'history') {
        fs.appendFile(historyPath, `${item}\n`, error => {
          if (error) {
            // eslint-disable-line no-empty
          }
        });
      }
    });

    this.cli.on('close', () => {
      let fileOpts, history, i, item, len, outstream, startIndex;

      history = this.cli.history();

      if (history.length <= historySize) {
        return this.shutdown();
      }

      startIndex = history.length - historySize;
      history = history.reverse().splice(startIndex, historySize);
      fileOpts = {
        mode: 0x180
      };

      outstream = fs.createWriteStream(historyPath, fileOpts);
      outstream.on('finish', this.shutdown.bind(this));

      for (i = 0, len = history.length; i < len; i++) {
        item = history[i];
        outstream.write(item + '\n');
      }

      outstream.end(this.shutdown.bind(this));
    });
  }
}

function loadHistory (callback) {
  if (!fs.existsSync(historyPath)) {
    return callback(new Error('No history available'));
  }

  const instream = fs.createReadStream(historyPath);
  const outstream = new Stream();
  outstream.readable = true;
  outstream.writable = true;

  const items = [];

  readline.createInterface({ input: instream, output: outstream, terminal: false })
    .on('line', function (line) {
      line = line.trim();
      if (line.length > 0) {
        items.push(line);
      }
    })
    .on('close', () => callback(null, items))
    .on('error', callback);
}

module.exports = ShellBot;
