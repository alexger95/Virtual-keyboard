import {getEnglishLayout, getRussianLayout} from './Language'

export default class KeyBoard {
  constructor(language = 'en', outputArea, keyBoardArea) { 
    this.language = language;
    this.currentSkin = {};
    this.loadSkin(this.language);
    this.shift = false;
    this.outputArea = outputArea;
    this.keyBoardArea = keyBoardArea;
    this.cursor = 0;
  }

  loadSkin(language) {
    if(language === 'en') {
      this.currentSkin = getEnglishLayout();
    } else {
      this.currentSkin = getRussianLayout();
    }
  }

  render() { 
    this.keyBoardArea.innerHTML = '';
    this.keyBoardFactory().map((row) => {     
      this.keyBoardArea.append(row);
    })
    this.keyHandler();
  }

  keyHandler() {
    document.addEventListener('keydown', (event) => this.keyDown(event))
    document.addEventListener('keyup', (event) => this.keyUp(event))
  }

  keyDown(event) {
    event.preventDefault();
    event.code === 16 && this.shiftWatcher(true)
    console.log('event key: ' + event.key + 'hash' + this.hashName(event.key))
    let key = document.querySelector(`[data-hash-name="${this.hashName(event.key)}"]`);
    this.buttonPressed(key, true)
    // this.inputSymbol(event.key, this.outputArea)
  }

  keyUp(event) {
    event.preventDefault();
    event.code === 16 && this.shiftWatcher(false)
    let key = document.querySelector(`[data-hash-name="${this.hashName(event.key)}"]`);
    console.log(key)
    this.buttonPressed(key, false)
  }

  filter(event) {
    switch(event.code) {
      case 'Backspace': 
        this.outputArea = this.outputArea.value.slice(0,-1);
        break
    
      case 'NumpadDecimal':  
        this.outputArea = this.outputArea.value.slice(0,-1);
        break
    
      default:
        this.outputArea = this.outputArea.value.slice(0,-1);
        break
    }
  }

  inputSymbol(unicode, inputNode = this.outputArea) {
    inputNode.append(unicode)
  }

  shiftWatcher(state) {
    if (state) {
      this.shift = true;
    } else {
      this.shift = false;
    }
    this.render()
  }

  clickHandler(event) {
    event.type === 'mousedown'?this.buttonPressed(event.target, true):this.buttonPressed(event.target, false)  
  }

  buttonPressed(key, addStyle) {
    if(addStyle) {
      key.classList.add('pressed');
      this.inputSymbol(key.innerText);
    } else {
      key.classList.remove('pressed');
    }
  }

  keyFactory(keyUnicode = '?') {
    let keyNode = document.createElement('div');
    keyNode.classList.add(keyUnicode, 'key');
    keyNode.dataset.hashName = this.hashName(keyUnicode);
    keyNode.innerText = keyUnicode;
    keyNode.addEventListener('mousedown', (event) => this.clickHandler(event))
    keyNode.addEventListener('mouseup', (event) => this.clickHandler(event))
    return keyNode;
  }

  rowFactory(layoutString = []) {
    let keysArray = layoutString.split(' ');
    let rowBlock = document.createElement('div');
    rowBlock.classList.add('rowBlock');
    keysArray = keysArray.map((element) => {
      return this.keyFactory(element)
    });
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
    keyBoardAllNodes = keyBoardAllNodes.map((row) => {
      return this.rowFactory(row);
    });
    return keyBoardAllNodes;
  }

  hashName(string) {
      let result = 0;
      for (let i = 0; i < string.length; i++) {
          result += string.charCodeAt(i);
      }
      return result;
  }
}