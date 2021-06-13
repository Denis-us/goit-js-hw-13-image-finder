import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function clickOnImg(event) {
    event.preventDefault();
  
    if (event.target.nodeName !== 'IMG') {
      return;
    }
  
    const scrollingImg = `<img src=${event.target.dataset.lightbox} alt="icon" />`;
    const example = basicLightbox.create(scrollingImg);
  
    example.show();
  }
  export { clickOnImg };