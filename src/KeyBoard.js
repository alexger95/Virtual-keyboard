import {getEnglishLayout, getRussianLayout} from './Language'

export default class KeyBoard {
  constructor(language = 'en', outputArea = Node, keyBoardArea = Node) { 
    this.language = language;
    this.currentSkin = {};
    this.loadSkin(this.language);
  }

  loadSkin(language) {
    if(language === 'en') {
      this.currentSkin = getEnglishLayout();
    } else {
      this.currentSkin = getRussianLayout();
    }
  }

  render() { 
    console.log(this.currentSkin)
  }

  keyFactory(keyUnicode = '?') {
    let keyNode = document.createElement('div');
    keyNode.classList.add(keyUnicode, 'key');
    keyNode.id = keyUnicode;
  }

  rowFactory(keys = []) {
    keys.map((element, index) => {
      keyFactory(keyUnicode = element)
    })
  }

}