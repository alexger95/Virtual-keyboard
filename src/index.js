import KeyBoard from './KeyBoard';

const ROOT = document.querySelector('#root');

let input = document.createElement('div');
input.classList.add('input');
let  keyBoard = document.createElement('div');
keyBoard.classList.add('keyBoard');
ROOT.append(input, keyBoard);

let keyBoardInstance = new KeyBoard('ru', input, keyBoard);
keyBoardInstance.render();



