import KeyBoard from './KeyBoard';
import './style.scss'

const ROOT = document.querySelector('#root');

let input = document.createElement('textarea');
input.classList.add('input');
let  keyBoard = document.createElement('div');
keyBoard.classList.add('keyBoard');
ROOT.append(input, keyBoard);

let keyBoardInstance = new KeyBoard('en', input, keyBoard);
keyBoardInstance.render();
console.log(keyBoardInstance.hashName('shift'))


