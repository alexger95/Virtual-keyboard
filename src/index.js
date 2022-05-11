import KeyBoard from './KeyBoard';
import './style.scss';

const ROOT = document.querySelector('#root');

const input = document.createElement('textarea');
input.classList.add('input');
input.autofocus = true;
const keyBoard = document.createElement('div');
keyBoard.classList.add('keyBoard');
const keyBoardLang = document.createElement('span');
keyBoardLang.classList.add('keyBoardLang');
keyBoardLang.innerText = 'en';
const description = document.createElement('span');
description.classList.add('keyBoardLang');
description.innerText = 'keyboard develop on windows, switch language alt+shift';
input.focus();
ROOT.append(input, keyBoard, keyBoardLang, description);

const keyBoardInstance = new KeyBoard('en', input, keyBoard, keyBoardLang);
keyBoardInstance.render();
alert('Мой pull requests https://github.com/alexger95/virtual-keyboard/pull/1');
