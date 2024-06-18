
export const useFontFamily = () => {
    const fontsList = ref([
      { name: 'Lato', code: 'Lato' },
      { name: 'Bangers', code: 'Bangers' },
      { name: 'Baskervville', code: 'Baskervville' },
      { name: 'Roboto Condensed', code: 'RobotoCondensed' },
      { name: 'Playfair Display', code: 'PlayfairDisplay' },
      { name: 'Kanit', code: 'Kanit' },
      { name: 'Noto Serif', code: 'NotoSerif' },
      { name: 'Bebas Neue', code: 'BebasNeue' },
      { name: 'Anton', code: 'Anton' },
      { name: 'Lobster', code: 'Lobster' },
      { name: 'Pacifico', code: 'Pacifico' },
      { name: 'Source Code Pro', code: 'SourceCodePro' },
      { name: 'Caveat', code: 'Caveat' },
    ]);
  
    return { fontsList };
  };
  