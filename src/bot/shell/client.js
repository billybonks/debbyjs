const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const cline = require('cline');
const chalk = require('chalk');

const historySize =  1024;

const historyPath = '.bot_history';


class ShellClient {
  constructor(name, output){
    this.name = name || 'defaultbot';
    this.console = output;
  }

  connect(){
    this.buildCli();
    loadHistory((error, history) => {
      if (error) {
        this.console.log(error.message);
      }

      this.cli.history(history);
      this.cli.interact(`${this.name}> `);
    });
  }

  send(message){
    this.console.log(chalk.bold(`${message.text}`));
  }

  onMessage(callback) {
    if (this.messageHandler !== callback) { return this.messageHandler = callback; }
  }

  shutdown () {
    return process.exit(0);
  }

  buildCli () {
    this.cli = cline();

    this.cli.command('*', (input) => {
      let userId = process.env.SHELL_USER_ID || '1';
      if (userId.match(/A\d+z/)) {
        userId = parseInt(userId);
      }

      const userName = process.env.SHELL_USER_NAME || 'Shell'; // eslint-disable-line no-unused-vars
      this.messageHandler({text: input, recipient:this.name, sender: userId}).catch( (error) => {
        this.console.log(error);
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

module.exports = ShellClient;
