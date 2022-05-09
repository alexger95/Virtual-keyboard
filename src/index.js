import KeyBoard from './KeyBoard';
import './style.scss'

const ROOT = document.querySelector('#root');

let input = document.createElement('textarea');
input.classList.add('input');
let  keyBoard = document.createElement('div');
keyBoard.classList.add('keyBoard');
let  keyBoardLang = document.createElement('span');
keyBoardLang.classList.add('keyBoardLang');
keyBoardLang.innerText = 'en'
ROOT.append(input, keyBoard, keyBoardLang);

let keyBoardInstance = new KeyBoard('en', input, keyBoard, keyBoardLang);
keyBoardInstance.render();
alert('Если не сложно, проверьте работу чуть позже, хочу немного доделать. Переключение языка Shift + Alt')


