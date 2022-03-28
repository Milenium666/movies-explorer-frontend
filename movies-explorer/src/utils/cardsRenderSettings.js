const cardsRenderSettings = {
    desktop: { total: 7, add: 7 },
    tablet: { total: 7, add: 7 },
    mobile: { total: 5, add: 5 },
  };
    
  export const getCardsRenderSettings = (windowWidth) => {
    let breakpoint = '';
  
    if (windowWidth >= 1280) {
      breakpoint = 'desktop';
    } else  if (windowWidth >= 650) {
      breakpoint = 'tablet';
    } else {
      breakpoint = 'mobile';
    }
    
    return cardsRenderSettings[breakpoint];
  };