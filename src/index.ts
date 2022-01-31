import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import LocalEchoController from 'local-echo';
import * as qna from '@tensorflow-models/qna';

import 'xterm/css/xterm.css';
import './style.scss';

const term = new Terminal({ cursorBlink: true });

const fitAddon = new FitAddon();
const webLinkAddon = new WebLinksAddon();
const localEcho = new LocalEchoController();

let qnaModel = qna.load();

const passage = `Hello everyone, My name is MD HamidRaza, you can call me Hamid. I am from Sundargarh, Odisha. Currently I leave in Bangalore, Karnataka. I work in DisneyPlusHotstar as Director of engineering. I have total 12 years of experience in Sotware engineering, and 6+ years of experience in technical leadership. You can contact me at my email rz@hamid.md`;

let availableCmds = [
  'intro',
  'about',
  'contact',
  'help',
  'history',
  'clear',
  'credits',
];

term.loadAddon(fitAddon);
term.loadAddon(webLinkAddon);
term.loadAddon(localEcho);

function termWrite(text: string, nl=2) {
  term.write(`${text}${"\r\n".repeat(nl)}`);
}

function writeIntro() {
  termWrite(`\r
  ╭─Welcome to:\r
  |   _     _                    _      _      __   __   _____  \r
  |  (_)   (_)                  (_)    (_)    (__)_(__) (_____) \r
  |  (_)___(_)  ____   __   __   _   __(_)   (_) (_) (_)(_)  (_)\r
  |  (_______) (____) (__)_(__) (_) (____)   (_) (_) (_)(_)  (_)\r
  |  (_)   (_)( )_( )(_) (_) (_)(_)(_)_(_) _ (_)     (_)(_)__(_)\r
  |  (_)   (_) (__)_)(_) (_) (_)(_) (____)(_)(_)     (_)(_____) \r
  |  \r
  ╰─(type 'help' for available commands)`);
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
  - ${availableCmds.join("\r\n  - ")}\r
  \r
Or, you can ask me anything, few examples\r
  - What is your name?\r
  - Where are you from?\r
  - How to contact you?\r
  - Where you currently leave?\r
  etc.`);
        break;
      }
      case 'history': {
        termWrite(`History: \r\n  - ${localEcho.history.entries.join("\r\n  - ")}`);
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
            termWrite(anss[0].text);
          } else {
            termWrite(`
  I didn't understand your command/query: ${cmd},\r
  please try again or ask something else.\r
  \r
  type 'help' for available commands.`);
          }
        });
      }
    }
  }

  return wait.then(() => localEcho.read("~$ "))
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
