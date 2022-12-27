import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import LocalEchoController from 'local-echo';
import chalk from 'chalk';
import * as qna from '@tensorflow-models/qna';
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

import 'xterm/css/xterm.css';
import './style.scss';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "hamidmd-d63b4.firebaseapp.com",
  projectId: "hamidmd-d63b4",
  storageBucket: "hamidmd-d63b4.appspot.com",
  messagingSenderId: "409985368155",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-FJC2MPGLJW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
getPerformance(app);

const baseTheme = {
  foreground: '#cccccc',
  background: '#282a36',
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

var scrnSM = window.matchMedia("(max-width: 576px)");
var scrnMD = window.matchMedia("(max-width: 768px)");
var scrnLG = window.matchMedia("(max-width: 992px)");
var scrnXL = window.matchMedia("(max-width: 1200px)");
var scrnXXL = window.matchMedia("(max-width: 1400px)");

const term = new Terminal({
  cursorBlink: true,
  theme: baseTheme,
  lineHeight: 1.2,
});

const fitAddon = new FitAddon();
const webLinkAddon = new WebLinksAddon();
const localEcho = new LocalEchoController();

let qnaModel = qna.load();

const passage = `Hello everyone, My name is MD HamidRaza, you can call me Hamid. I am from Sundargarh, Odisha. Currently I live in Dubai, UAE. I love programming and developing web and mobile applications. In my free time you'll find me playing around or tinkering with different frameworks, libraries or new technogolies. Currently I am actively exploring and learning about Crypto, Blockchain and Web3 world. I have total 12 years of experience in Software engineering, and 6+ years of experience in technical leadership. You can contact me at my email rz@hamid.md`;

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
  if(scrnSM.matches) {
termWrite(`\r
${chalk.magentaBright('╭─ Welcome to:')}\r
${chalk.magentaBright('|')}  Ⲏⲁⲙⲓⲇ.ⲘⲆ\r
${chalk.magentaBright('╰─')}${chalk.magentaBright(`(type '${chalk.bold('help')}' for available commands)`)}`);
  } else if(scrnLG.matches) {
termWrite(`\r
${chalk.magentaBright('╭─ Welcome to:')}\r
${chalk.magentaBright('|')}   _  _            _    _   __  __ ___        \r
${chalk.magentaBright('|')}  | || |__ _ _ __ (_)__| | |  \\/  |   \\     \r
${chalk.magentaBright('|')}  | __ / _\` | '  \\| / _\` |_| |\\/| | |) |  \r
${chalk.magentaBright('|')}  |_||_\\__,_|_|_|_|_\\__,_(_)_|  |_|___/     \r
${chalk.magentaBright('|')}\r
${chalk.magentaBright('╰─')}${chalk.magentaBright(`(type '${chalk.bold('help')}' for available commands)`)}`);
  } else {
termWrite(`\r
${chalk.magentaBright('╭─ Welcome to:')}\r
${chalk.magentaBright('|')}    __    __       __       ___      ___   __     ________          ___      ___  ________                 \r
${chalk.magentaBright('|')}    /" |  | "\\     /""\\     |"  \\    /"  | |" \\   |"      "\\        |"  \\    /"  ||"      "\\        \r
${chalk.magentaBright('|')}   (:  (__)  :)   /    \\     \\   \\  //   | ||  |  (.  ___  :)        \\   \\  //   |(.  ___  :)         \r
${chalk.magentaBright('|')}    \\/      \\/   /' /\\  \\    /\\\\  \\/.    | |:  |  |: \\   ) ||        /\\\\  \\/.    ||: \\   ) ||  \r
${chalk.magentaBright('|')}    //  __  \\\\  //  __'  \\  |: \\.        | |.  |  (| (___\\ || _____ |: \\.        |(| (___\\ ||       \r
${chalk.magentaBright('|')}   (:  (  )  :)/   /  \\\\  \\ |.  \\    /:  | /\\  |\\ |:       :)))_  ")|.  \\    /:  ||:       :)       \r
${chalk.magentaBright('|')}    \\__|  |__/(___/    \\___)|___|\\__/|___|(__\\_|_)(________/(_____( |___|\\__/|___|(________/          \r
${chalk.magentaBright('|')} \r
${chalk.magentaBright('╰─')}${chalk.magentaBright(`(type '${chalk.bold('help')}' for available commands)`)}`);
  }
}

function runCmd(command: string = ""): Promise<string | void> {
  let wait = Promise.resolve();
  let cmd = command.trim();
  let analyticsData = { content_type: 'cmd', value: cmd, success: true };
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
        analyticsData.content_type = 'qna';
        wait = qnaModel.then(model => model.findAnswers(cmd, passage)).then(anss => {
          if(anss[0]) {
            termWrite(chalk.whiteBright(anss[0].text));
          } else {
            analyticsData.success = false;
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

  logEvent(analytics, 'select_content', analyticsData);

  return wait.then(() => localEcho.read(`╭── ${chalk.bold.greenBright('[Guest user]: ~/')}\r\n╰─$ `))
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
