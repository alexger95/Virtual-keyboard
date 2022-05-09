import {getEnglishLayout, getRussianLayout, getKeyCode} from './Language'

export default class KeyBoard {
  constructor(language = 'en', outputArea, keyBoardArea, keyBoardLang) { 
    this.language = language;
    this.currentSkin = {};
    this.loadSkin(this.language);
    this.keyCode = getKeyCode().default;
    this.shift = false;
    this.shift = false;
    this.outputArea = outputArea;
    this.keyBoardArea = keyBoardArea;
    this.keyBoardLang = keyBoardLang;
    this.cursor = 0;
  }

  loadSkin(language) {
    if(language === 'en') {
      this.currentSkin = getEnglishLayout();
    } else {
      this.currentSkin = getRussianLayout();
    }
    console.log( this.keyBoardLang )
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
    console.log('keydown')
    event.preventDefault();
    let keyNode = document.querySelector(`[data-code-name="${event.code}"]`);
    this.keyPressed(keyNode, true);
    
    if(this.shiftWatcher(event, true) && this.altWatcher(event, true)) {
      this.inputSymbol(keyNode.innerHTML);
    } 
    
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
      // if (this.filter(event)) {
      //   this.inputSymbol(event.target.key.innerText);
      // }
    } else {
      keyNode.classList.remove('pressed');
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
      event.target.key.classList.add('pressed');
      if (this.filter(event)) {
        this.inputSymbol(event.target.key.innerText);
      }
    } else {
      event.target.key.classList.remove('pressed');
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



  filter(event) {
    if(event.code === 'ShiftLeft' && event.code === 'ShiftRight') {
      if(event.type === 'mousedown' && event.target === document.querySelector(`[data-code-name="${event.code}"]`)) {
        console.log('shift set')
      }
    }
    
    // switch(event.code) {
    //   case 'ShiftLeft': 
    //   return false;
    //     break
    
    //   case 'ShiftRight':  
    //   return false;
    //     break
        
    //   case 'Delete': 
    //   return false;
    //   break

    //   default:
    //     return true;
    //     break
    // }
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

  
}