import { getEnglishLayout, getRussianLayout, getKeyCode } from './Language';

export default class KeyBoard {
  constructor(language, outputArea, keyBoardArea, keyBoardLang) {
    this.language;
    this.checkLocalStorageLanguage(language);
    this.currentSkin = {};
    this.shift = false;
    this.alt = false;
    this.outputArea = outputArea;
    this.keyBoardArea = keyBoardArea;
    this.keyBoardLang = keyBoardLang;
    this.loadSkin(this.language);
    this.keyCode = getKeyCode().default;
  }
  
  setLocalStorageLanguage(lang) {
    localStorage.setItem('lang', lang);
  }

  checkLocalStorageLanguage(lang) {
    if (localStorage.getItem('lang')) {
      this.language = localStorage.getItem('lang');
    } else {
      this.language = lang;
    }
  }

  loadSkin(language) {
    if (language === 'en') {
      this.currentSkin = getEnglishLayout();
      this.language = 'en';
    } else {
      this.currentSkin = getRussianLayout();
      this.language = 'ru';
    }
    this.setLocalStorageLanguage(this.language);
    this.keyBoardLang.innerText = this.language;
  }

  render() {
    this.keyBoardArea.innerHTML = '';
    this.keyBoardFactory().map((row) => {
      this.keyBoardArea.append(row);
    });
    this.keyHandler();
  }

  updateKey() {
    this.keyCode.map((row, i) => {
      row.split(' ').map((e, j) => {
        const node = document.querySelector(`[data-code-name="${e}"]`);
        if (this.shift) {
          node.innerText = this.currentSkin.shift[i].split(' ')[j];
        } else {
          node.innerText = this.currentSkin.default[i].split(' ')[j];
        }
      });
    });
  }

  /// ////////////////KEY////////////////////////////////

  keyHandler() {
    document.addEventListener('keydown', (event) => this.functionKey(event));
    document.addEventListener('keyup', (event) => this.functionKey(event));
  }

  keyPressed(keyNode, addStyle) {
    if (addStyle) {
      keyNode.classList.add('pressed');
    } else {
      keyNode.classList.remove('pressed');
    }
  }

  keyPressedButton(keyNode, addStyle) {
    if (addStyle) {
      keyNode.classList.add('pressed');
    } else {
      keyNode.classList.remove('pressed');
    }
  }

  /// //////////////////////////////////////////////////////////////
  keyFactory(keyUnicode = '?', keysCode, keyIndex) {
    const keyNode = document.createElement('div');
    keyNode.classList.add('key');
    keyNode.dataset.codeName = keysCode[keyIndex];
    keyNode.innerText = keyUnicode;
    keyNode.addEventListener('mousedown', (event) => this.functionButtons(event));
    keyNode.addEventListener('mouseup', (event) => this.functionButtons(event));
    return keyNode;
  }

  rowFactory(layoutString = [], rowIndex) {
    let keysArray = layoutString.split(' ');
    const keysCode = this.keyCode[rowIndex].split(' ');
    const rowBlock = document.createElement('div');
    rowBlock.classList.add('rowBlock');
    keysArray = keysArray.map((key, keyIndex) => this.keyFactory(key, keysCode, keyIndex));
    rowBlock.append(...keysArray);
    return rowBlock;
  }

  keyBoardFactory() {
    let keyBoardAllNodes = [];
    if (this.shift) {
      keyBoardAllNodes = this.currentSkin.shift;
    } else {
      keyBoardAllNodes = this.currentSkin.default;
    }
    keyBoardAllNodes = keyBoardAllNodes.map((row, rowIndex) => this.rowFactory(row, rowIndex));
    return keyBoardAllNodes;
  }

  /// //////////////////////////////////////////////////////////
  inputSymbol(unicode, inputNode = this.outputArea) {
    // inputNode.append(unicode)
    inputNode.value += unicode;
  }
  /// /////////////////////////button////////////////////////////////////////////////////////////

  functionButtons(event) {
    if (event.type === 'mousedown') {
      event.target.classList.toggle('pressed');
      this.selectionStart++;
      const eK = {};
      eK.code = event.target.dataset.codeName;
      switch (event.target.dataset.codeName) {
        case 'ShiftLeft':
          return this.shiftWatcherButton(eK);
          break;

        case 'ShiftRight':
          return this.shiftWatcherButton(eK);
          break;

        case 'AltLeft':
          return this.altWatcherButton(eK);
          break;

        case 'ControlLeft':
          return this.controlWatcher(eK, true);
          break;

        case 'Space':
          return this.spaceWatcher(eK, true);
          break;

        case 'Enter':
          return this.enterWatcher(eK, true);
          break;

        case 'Tab':
          return this.tabWatcher(eK, true);
          break;

        case 'ArrowUp':
          return this.arrowUpWatcher(eK, true);
          break;

        case 'ArrowDown':
          return this.arrowDownWatcher(eK, true);
          break;

        case 'ArrowLeft':
          return this.arrowLeftWatcher(eK, true);
          break;

        case 'ArrowRight':
          return this.arrowRightWatcher(eK, true);
          break;

        case 'Delete':
          return this.deleteChar();
          break;

        case 'Backspace':
          return this.backspaceChar();
          break;

        default:
          this.inputSymbol(event.target.innerText);
          return true;
          break;
      }
    } else {
      switch (event.target.dataset.codeName) {
        case 'ShiftLeft':
          return this.shiftWatcherButton(event);
          break;

        case 'ShiftRight':
          return this.shiftWatcherButton(event);
          break;

        case 'AltLeft':
          event.target.classList.remove('pressed');
          return this.altWatcherButton(event);
          break;

        case 'ControlLeft':
          event.target.classList.remove('pressed');
          return this.controlWatcher(event, false);
          break;

        case 'Space':
          event.target.classList.remove('pressed');
          return this.spaceWatcher(event, false);
          break;

        case 'Enter':
          event.target.classList.remove('pressed');
          return this.enterWatcher(event, false);
          break;

        case 'Tab':
          event.target.classList.remove('pressed');
          return this.tabWatcher(event, false);
          break;

        case 'ArrowUp':
          event.target.classList.remove('pressed');
          return this.arrowUpWatcher(event, false);
          break;

        case 'ArrowDown':
          event.target.classList.remove('pressed');
          return this.arrowDownWatcher(event, false);
          break;

        case 'ArrowLeft':
          event.target.classList.remove('pressed');
          return this.arrowLeftWatcher(event, false);
          break;

        case 'ArrowRight':
          event.target.classList.remove('pressed');
          return this.arrowRightWatcher(event, false);
          break;

        case 'Delete':
          event.target.classList.remove('pressed');
          return this.deleteChar();
          break;

        case 'Backspace':
          event.target.classList.remove('pressed');
          return this.backspaceChar();
          break;

        default:
          event.target.classList.remove('pressed');
          return false;
          break;
      }
    }
  }
  /// /////////////////////////////key////

  functionKey(event) {
    event.preventDefault();
    const keyNode = document.querySelector(`[data-code-name="${event.code}"]`);
    const inputSymbol = keyNode.innerText;

    if (event.type === 'keydown') {
      this.keyPressed(keyNode, true);
      switch (event.code) {
        case 'ShiftLeft':
          return this.shiftWatcher(event, true);
          break;

        case 'ShiftRight':
          return this.shiftWatcher(event, true);
          break;

        case 'AltLeft':
          return this.altWatcher(event, true);
          break;

        case 'ControlLeft':
          return this.controlWatcher(event, true);
          break;

        case 'Space':
          return this.spaceWatcher(event, true);
          break;

        case 'Enter':
          return this.enterWatcher(event, true);
          break;

        case 'Tab':
          return this.tabWatcher(event, true);
          break;

        case 'ArrowUp':
          return this.arrowUpWatcher(event, true);
          break;

        case 'ArrowDown':
          return this.arrowDownWatcher(event, true);
          break;

        case 'ArrowLeft':
          return this.arrowLeftWatcher(event, true);
          break;

        case 'ArrowRight':
          return this.arrowRightWatcher(event, true);
          break;

        case 'Delete':
          return this.deleteChar();
          break;

        case 'Backspace':
          return this.backspaceChar();
          break;

        default:
          this.inputSymbol(inputSymbol);
          this.selectionStart++;
          return true;
          break;
      }
    } else {
      this.keyPressed(keyNode, false);
      switch (event.code) {
        case 'ShiftLeft':
          return this.shiftWatcher(event, false);
          break;

        case 'ShiftRight':
          return this.shiftWatcher(event, false);
          break;

        case 'AltLeft':
          return this.altWatcher(event, false);
          break;

        case 'ControlLeft':
          return this.controlWatcher(event, false);
          break;

        case 'Space':
          return this.spaceWatcher(event, false);
          break;

        case 'Enter':
          return this.enterWatcher(event, false);
          break;

        case 'Tab':
          return this.tabWatcher(event, false);
          break;

        case 'ArrowUp':
          return this.arrowUpWatcher(event, false);
          break;

        case 'ArrowDown':
          return this.arrowDownWatcher(event, false);
          break;

        case 'ArrowLeft':
          return this.arrowLeftWatcher(event, false);
          break;

        case 'ArrowRight':
          return this.arrowRightWatcher(event, false);
          break;

        case 'Delete':
          return this.deleteChar();
          break;

        case 'Backspace':
          return this.backspaceChar();
          break;

        default:

          return false;
          break;
      }
    }
  }

  shiftWatcher(event, state) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.shift = state;
      if (!this.checkSwitchLang()) {
        this.updateKey();
      }
      if (this.shift) {
        this.updateKey();
      }
    }
  }

  shiftWatcherButton(event) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.shift = !this.shift;
      if (!this.checkSwitchLang()) {
        this.updateKey();
      }
      if (this.shift) {
        this.updateKey();
      }
      // event.target.toggle('pressed')
    }
  }

  altWatcherButton(event) {
    if (event.code === 'AltLeft' || event.code === 'AltRight') {
      this.alt = !this.alt;
      if (!this.checkSwitchLang()) {
        this.updateKey();
      }
    }
  }

  altWatcher(event, state) {
    if (event.code === 'AltLeft' || event.code === 'AltRight') {
      this.alt = state;
      if (!this.checkSwitchLang()) {
        this.updateKey();
      }
    }
  }

  checkSwitchLang() {
    if (this.shift && this.alt) {
      if (this.language === 'en') {
        this.loadSkin('ru');
      } else {
        this.loadSkin('en');
      }
      this.updateKey();
      return true;
    }
  }

  spaceWatcher(event) {
    if (event.code === 'Space') {
      this.inputSymbol(' ');
      return false;
    }
    return true;
  }

  enterWatcher(event) {
    if (event.code === 'Enter') {
      this.inputSymbol('\n');
      return false;
    }
    return true;
  }

  tabWatcher(event) {
    if (event.code === 'Tab') {
      this.inputSymbol('    ');
      return false;
    }
    return true;
  }

  arrowUpWatcher(event) {
    if (event.code === 'ArrowUp') {
      this.inputSymbol('↑');
      return false;
    }
    return true;
  }

  arrowDownWatcher(event) {
    if (event.code === 'ArrowDown') {
      this.inputSymbol('↓');
      return false;
    }
    return true;
  }

  arrowLeftWatcher(event) {
    if (event.code === 'ArrowLeft') {
      this.inputSymbol('←');
      return false;
    }
    return true;
  }

  arrowRightWatcher(event) {
    if (event.code === 'ArrowRight') {
      this.inputSymbol('→');
      return false;
    }
    return true;
  }

  setSelection(position) {
    this.outputArea.selectionEnd = position;
    this.outputArea.selectionStart = position;
  }

  deleteChar() {
    const { value } = this.outputArea;
    let array = value.split('');
    let first;
    let second;
    if (value) {
      if (this.outputArea.selectionStart < array.length) {
        first = array.slice(0, this.outputArea.selectionEnd);
        second = array.slice(this.outputArea.selectionEnd + 1, array.length);
      }
    }
    array = [];
    if (first.length > 0) {
      this.outputArea.value = first.concat(second).join('');
    } else if (second.length > 0) {
      this.outputArea.value = second.join('');
    }
  }

  backspaceChar() {
    const { value } = this.outputArea;
    const array = value.split('');
    if (value.length > 0) {
      array.pop();
    }
    this.outputArea.value = array.join('');
  }
}
