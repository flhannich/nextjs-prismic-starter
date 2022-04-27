
export const loadFonts = fonts => {
    let fontList = [];
    fonts.map(item => {
      let name = item.font.name.split('.')[0];
      let font = new FontFace(name, `url(${item.font.url})`);
      document.fonts.add(font);
      fontList.push({
        name: name, 
        url: item.font.url
      });
    })
    return fontList;
  }


  export const accessibleHighlight = () => {

    function handleKeyPress() {
      if (event.keyCode === 9) {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleKeyPress);
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener('keydown', function() {handleKeyPress(event) });
    }
    
}
