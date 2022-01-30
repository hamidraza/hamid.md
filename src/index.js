import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import LocalEchoController from 'local-echo';

import 'xterm/css/xterm.css';
import './style.scss';

const term = new Terminal({ cursorBlink: true });

const fitAddon = new FitAddon();
const webLinkAddon = new WebLinksAddon();
const localEcho = new LocalEchoController();

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

function termWrite(text, nl=2) {
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

function runCmd(command = "") {
  var cmd = command.trim();
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
        termWrite(`Available commands: \r\n  - ${availableCmds.join("\r\n  - ")}`);
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
  Check complete credits at: https://hamid.md/credits.html`)
        break;
      }
      default: {
        termWrite(`command not found: ${cmd}\r\ntype 'help' for available commands`)
      }
    }
  }
  return localEcho
    .read("~$ ").then(runCmd)
    .catch(error => console.error(`Error reading: ${error}`));
}

localEcho.addAutocompleteHandler((index, tokens) => index == 0 ? availableCmds : []);

term.open(document.getElementById('xterm-container'));
fitAddon.fit();

runCmd('intro')
