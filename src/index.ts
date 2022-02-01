import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import LocalEchoController from 'local-echo';
import chalk from 'chalk';
import * as qna from '@tensorflow-models/qna';

import 'xterm/css/xterm.css';
import './style.scss';

const baseTheme = {
  foreground: '#cccccc',
  background: '#2D2E2C',
  selection: '#5DA5D533',
  black: '#1E1E1D',
  brightBlack: '#262625',
  red: '#CE5C5C',
  brightRed: '#FF7272',
  green: '#5BCC5B',
  brightGreen: '#72FF72',
  yellow: '#CCCC5B',
  brightYellow: '#FFFF72',
  blue: '#5D5DD3',
  brightBlue: '#7279FF',
  magenta: '#BC5ED1',
  brightMagenta: '#E572FF',
  cyan: '#5DA5D5',
  brightCyan: '#72F0FF',
  white: '#F8F8F8',
  brightWhite: '#FFFFFF'
};

const term = new Terminal({
  cursorBlink: true,
  theme: baseTheme,
});

const fitAddon = new FitAddon();
const webLinkAddon = new WebLinksAddon();
const localEcho = new LocalEchoController();

let qnaModel = qna.load();

const passage = `Hello everyone, My name is MD HamidRaza, you can call me Hamid. I am from Sundargarh, Odisha. Currently I live in Bangalore, Karnataka. I work in DisneyPlusHotstar as Director of engineering. I have total 12 years of experience in Sotware engineering, and 6+ years of experience in technical leadership. You can contact me at my email rz@hamid.md`;

let availableCmds = [
  'intro',
  'about',
  'contact',
  'help',
  'history',
  'clear',
  'credits',
];

let qnaExamples = [
  'What is your name?',
  'Where are you from?',
  'How to contact you?',
  'Where do you live?',
];

term.loadAddon(fitAddon);
term.loadAddon(webLinkAddon);
term.loadAddon(localEcho);

function termWrite(text: string, nl=1) {
  term.writeln(`${text}${"\r\n".repeat(nl)}`);
}

function writeIntro() {
  termWrite(`\r
  ${chalk.magentaBright('╭─ Welcome to:')}\r
  ${chalk.magentaBright('|')}  ${chalk.cyanBright(` _     _                   ${chalk.bold(' _ ')}     _      __   __   _____  `)}\r
  ${chalk.magentaBright('|')}  ${chalk.cyanBright(`(_)   (_)                  ${chalk.bold('(_)')}    (_)    (__)_(__) (_____) `)}\r
  ${chalk.magentaBright('|')}  ${chalk.cyanBright(`(_)___(_)  ____   __   __   _   __(_)   (_) (_) (_)(_)  (_)`)}\r
  ${chalk.magentaBright('|')}  ${chalk.cyanBright(`(_______) (____) (__)_(__) (_) (____)   (_) (_) (_)(_)  (_)`)}\r
  ${chalk.magentaBright('|')}  ${chalk.cyanBright(`(_)   (_)( )_( )(_) (_) (_)(_)(_)_(_)${chalk.bold(' _ ')}(_)     (_)(_)__(_)`)}\r
  ${chalk.magentaBright('|')}  ${chalk.cyanBright(`(_)   (_) (__)_)(_) (_) (_)(_) (____)${chalk.bold('(_)')}(_)     (_)(_____) `)}\r
  ${chalk.magentaBright('|')}  \r
  ${chalk.magentaBright('╰─')}${chalk.magentaBright(`(type '${chalk.bold('help')}' for available commands)`)}`);
}

function runCmd(command: string = ""): Promise<string | void> {
  let wait = Promise.resolve();
  let cmd = command.trim();
  if (cmd) {
    switch(cmd) {
      case 'intro': {
        writeIntro();
        break;
      }
      case 'about': {
        termWrite(`\r
  Welcome to Hamid.MD ${process.env.VERSION ? `(${process.env.VERSION})` : ''}\r
  Connect with me at:\r
  \r
  - linkedIn\r
    https://www.linkedin.com/in/hamidMD/\r
    \r
  - Twitter\r
    https://twitter.com/hasis\r
    \r
  You can also reach out to me at: [rz@hamid.md]`);
        break;
      }
      case 'contact': {
        termWrite(`\r\n  Say Hi to me at: [rz@hamid.md]`)
        break;
      }
      case 'clear': {
        term.clear()
        break;
      }
      case 'help': {
        termWrite(`Available commands: \r
  - ${availableCmds.map(v => chalk.cyanBright(v)).join("\r\n  - ")}\r
  \r
Or, you can ask me anything, few examples:\r
  - ${qnaExamples.map(v => chalk.cyanBright(v)).join("\r\n  - ")}\r
  ${chalk.whiteBright('etc.')}`);
        break;
      }
      case 'history': {
        termWrite(`History: \r\n  - ${localEcho.history.entries.map(v => chalk.cyanBright(v)).join("\r\n  - ")}`);
        break;
      }
      case 'credits': {
        termWrite(`\r
  - Xterm.js\r
    https://xtermjs.org/\r
    \r
  - local-echo\r
    https://github.com/wavesoft/local-echo\r
    \r
  - Natural language question answering\r
    https://github.com/tensorflow/tfjs-models/tree/master/qna\r
    \r
  Check complete credits at: https://hamid.md/credits.html`)
        break;
      }
      default: {
        wait = qnaModel.then(model => model.findAnswers(cmd, passage)).then(anss => {
          if(anss[0]) {
            termWrite(chalk.whiteBright(anss[0].text));
          } else {
            termWrite(`
  I didn't understand your command/query: ${chalk.cyanBright(cmd)},\r
  please try again or ask something else.\r
  \r
  ${chalk.magenta(`type '${chalk.bold('help')}' for available commands`)}.`);
          }
        });
      }
    }
  }

  return wait.then(() => localEcho.read(`╭─ ${chalk.greenBright('[Guest user]: ~/')}\r\n╰─$ `))
    .then(runCmd)
    .catch(error => console.error(`Error reading: ${error}`));
}

localEcho.addAutocompleteHandler(i => i == 0 ? availableCmds : []);

term.open(document.getElementById('xterm-container') || document.body);
fitAddon.fit();

window.addEventListener('resize', () => {
  fitAddon.fit();
});

runCmd('intro')
