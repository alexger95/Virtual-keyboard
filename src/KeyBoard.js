import {getEnglishLayout, getRussianLayout, getKeyCode} from './Language'

export default class KeyBoard {
  constructor(language = 'en', outputArea, keyBoardArea, keyBoardLang) { 
    this.language;
    this.checkLocalStorageLanguage(language);    
    this.currentSkin = {};    
    this.shift = false;
    this.alt = false;
    this.outputArea = outputArea;
    this.keyBoardArea = keyBoardArea;
    this.keyBoardLang = keyBoardLang;
    this.functionKey = ['ShiftLeft', 'ControlLeft', 'AltLeft', 'Space', 'Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    this.loadSkin(this.language);
    this.keyCode = getKeyCode().default;
    console.log(this.keyBoardLang)
  }

  setLocalStorageLanguage(lang) {
    localStorage.setItem('lang', lang);
  }

  checkLocalStorageLanguage(lang) {
    if(localStorage.getItem('lang')) {
      this.language = localStorage.getItem('lang');
    } else {
      this.language = lang
    }
  }

  loadSkin(language) {
    if(language === 'en') {
      this.currentSkin = getEnglishLayout();
      this.language = 'en'
    } else {
      this.currentSkin = getRussianLayout();
      this.language = 'ru'
    }
    this.setLocalStorageLanguage(this.language)
    this.keyBoardLang.innerText = this.language
  }

  render() { 
    this.keyBoardArea.innerHTML = '';
    this.keyBoardFactory().map((row) => {     
      this.keyBoardArea.append(row);
    })
    this.keyHandler();
  }
///////////////////KEY////////////////////////////////
  keyHandler() {
    document.addEventListener('keydown', (event) => this.keyDown(event));
    document.addEventListener('keyup', (event) => this.keyUp(event));
  }

  keyDown(event) {
    event.preventDefault();
    let keyNode = document.querySelector(`[data-code-name="${event.code}"]`);
    this.keyPressed(keyNode, true);
    this.keyRouter(event);
  }

  keyUp(event) {
    event.preventDefault();
    this.shiftWatcher(event, false);
    
    let keyNode = document.querySelector(`[data-code-name="${event.code}"]`);
    this.keyPressed(keyNode, false)
  }

  keyPressed(keyNode, addStyle) {
    if(addStyle) {
      keyNode.classList.add('pressed');
    } else {
      keyNode.classList.remove('pressed');
    }
  }

  keyRouter(event) {
    if(this.functionKey.indexOf(event.code) === -1) {
      this.inputSymbol(event.key);
    } else {
      this.functionButtons(event);
    }
  }
////////////////////////////button////////////////////////////////////////////////////////////

  clickHandler(event) {
    if(event.type === 'mousedown') {
      this.buttonPressed(event, true)
      // event.target.removeEventListener('mousedown')
    } else {
      this.buttonPressed(event, false)
      // event.target.addEventListener('mousedown', (event) => this.clickHandler(event))
    }
    
  }

  buttonPressed(event, addStyle) {
    if(addStyle) {
      event.target.classList.add('pressed');
      
      if(this.functionKey.indexOf(event.target.dataset.codeName) === -1) {
        this.inputSymbol(event.target.innerText);
      } else {
        let eK = {};
        eK.code = event.target.dataset.codeName;
        this.functionButtons(eK);
      }
    } else {
      
      event.target.classList.remove('pressed');
    }
  }

  
/////////////////////////////////////////////////////////////////
  keyFactory(keyUnicode = '?', keysCode, keyIndex) {  
    let keyNode = document.createElement('div');
    keyNode.classList.add('key');
    keyNode.dataset.codeName = keysCode[keyIndex];
    keyNode.innerText = keyUnicode;
    keyNode.addEventListener('mousedown', (event) => this.clickHandler(event))
    keyNode.addEventListener('mouseup', (event) => this.clickHandler(event))
    return keyNode;
  }

  rowFactory(layoutString = [], rowIndex) {
    let keysArray = layoutString.split(' ');
    let keysCode = this.keyCode[rowIndex].split(' ');
    let rowBlock = document.createElement('div');
    rowBlock.classList.add('rowBlock');
    keysArray = keysArray.map((key, keyIndex) => {
      return this.keyFactory(key, keysCode, keyIndex)
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
    keyBoardAllNodes = keyBoardAllNodes.map((row, rowIndex) => {  
      return this.rowFactory(row, rowIndex);
    });
    return keyBoardAllNodes;
  }

/////////////////////////////////////////////////////////////
  inputSymbol(unicode, inputNode = this.outputArea) {
    inputNode.append(unicode)
  }

  functionButtons(event) {    
    switch(event.code) {
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

      default:
        return true;
        break;
    }
  }

  shiftWatcher(event, state) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      if (state) {
        if (this.shift != true) {
          this.shift = true;
          if(this.alt === true) {
            if (this.language === 'en') {
              this.loadSkin('ru')
            } else {
              this.loadSkin('en')
            }
          }
          this.render()
        }
      } else {
        this.shift = false;
        this.render()
      }
      return false;
    }     else {
      return true
    }
  }

  altWatcher(event, state) {
    if (event.code === 'AltLeft' || event.code === 'AltRight') {
      if (state) {
        if (this.alt != true) {
          this.alt = true;
          if(this.shift === true) {
            if (this.language === 'en') {
              this.loadSkin('ru')
            } else {
              this.loadSkin('en')
            }
          }
          this.render()
        }
      } else {
        this.alt = false;
        this.render()
      }
      return false;
    }    else {
      return true
    }
  }

  spaceWatcher(event) {
    if (event.code === 'Space') {
      this.inputSymbol(' ');
      return false;
    } else {
      return true
    }
  }
  

  enterWatcher(event) {
    if (event.code === 'Enter') {
      this.inputSymbol('\n');
      return false;
    } else {
      return true
    }
  }

  tabWatcher(event) {
    if (event.code === 'Tab') {
      this.inputSymbol('    ');
      return false;
    } else {
      return true
    }
  }

  arrowUpWatcher(event) {
    if (event.code === 'ArrowUp') {
      this.inputSymbol('↑');
      return false;
    } else {
      return true
    }
  }
  arrowDownWatcher(event) {
    if (event.code === 'ArrowDown') {
      this.inputSymbol('↓');
      return false;
    } else {
      return true
    }
  }
  arrowLeftWatcher(event) {
    if (event.code === 'ArrowLeft') {
      this.inputSymbol('←');
      return false;
    } else {
      return true
    }
  }
  arrowRightWatcher(event) {
    if (event.code === 'ArrowRight') {
      this.inputSymbol('→');
      return false;
    } else {
      return true
    }
  }
  
}