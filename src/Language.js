export const getEnglishLayout = () => {
  return {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\ {del}",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / ↑ {shift}",
      "{ctrl} {vendor} {alt} {space} {alt} {ctrl} ← ↓ →",
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } | {del}",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? ↑ {shift}",
      "{ctrl} {vendor} {alt} {space} {alt} {ctrl} ← ↓ →",
    ],
  };
};

export const getRussianLayout = () => {
  return {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} й ц у к е н г ш щ з х ъ \\ {del}",
      "{lock} ф ы в а п р о л д ж э {enter}",
      "{shift} я ч с м и т ь б ю . {shift}",
      "{ctrl} {vendor} {alt} {space} {alt} {ctrl} ← ↓ →",
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ | {del}",
      '{lock} Ф Ы В А П Р О Л Д Ж Э {enter}',
      "{shift} Я Ч С М И Т Ь Б Ю . {shift}",
      "{ctrl} {vendor} {alt} {space} {alt} {ctrl} ← ↓ →",
    ],
  };
};