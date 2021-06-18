import './sass/main.scss';
import 'lazysizes';
import images from "./gallery-items";

const galleryContainer = document.querySelector('.js-gallery ');
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const buttonClose = document.querySelector('.lightbox__button');
const overlay = document.querySelector('.lightbox__overlay');

galleryContainer.addEventListener('click', openModalOnClick);



const items = createMarkupGalleryItems(images);
galleryContainer.insertAdjacentHTML('beforeend', items);

const galleryImages = document.querySelectorAll('.gallery__image');


function createMarkupGalleryItems(images) {
    return images.map(({original,preview,description},index) => {
        return ` <li class="gallery__item">
<a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image lazyload "
      
      data-src="${preview}"
      data-source="${original}"
      data-index="${index}"
      alt="${description}"
      
    />
  </a>
</li> `
    }).join('');
    
};



function openModalOnClick(e) {
    
    e.preventDefault()

    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
    modal.classList.add('is-open');
    const urlOriginalImage = e.target.dataset.source;
    modalImg.src = urlOriginalImage;
    let index = Number(e.target.dataset.index);
    window.addEventListener('keydown', closeModalOnEsk);
    buttonClose.addEventListener('click',closeModalOnClick);
    overlay.addEventListener('click', closeModalOnClick);

    window.addEventListener('keydown',(evt) => {
    const btnLeft = evt.code === "ArrowLeft";
    
        if (btnLeft) {
    
            index -= 1;
            index < 0 && (index = galleryImages.length - 1);
            modalImg.src = galleryImages[index].dataset.source;
            modalImg.alt=galleryImages[index].alt;
    }
    });
   
 window.addEventListener('keydown', (evt) => {
    const btnRight = evt.code === "ArrowRight";
        if (btnRight) {
            index += 1;
        index >= images.length && (index = 0)
        
        modalImg.src=galleryImages[index].dataset.source;
        modalImg.alt=galleryImages[index].alt;
        
    }
});
  
};



function closeModalOnClick() {
    modal.classList.remove('is-open');
    modalImg.src = '';
    modalImg.alt='';
    window.removeEventListener('keydown', closeModalOnEsk);
    buttonClose.removeEventListener('click',closeModalOnClick);
    overlay.removeEventListener('click', closeModalOnClick);
};
 
function closeModalOnEsk(e) {
     if(e.code==="Escape"){
          closeModalOnClick();
     }
};


