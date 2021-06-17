import './sass/main.scss';

import images from "./gallery-items.js";

const galleryContainer = document.querySelector('.js-gallery ');
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const buttonClose = document.querySelector('.lightbox__button');
const overlay = document.querySelector('.lightbox__overlay');

galleryContainer.addEventListener('click', openModalOnClick);
buttonClose.addEventListener('click',closeModalOnClick);
overlay.addEventListener('click', onOverleyClick);


const items = createMarkupGalleryItems(images);
galleryContainer.insertAdjacentHTML('beforeend', items);


function createMarkupGalleryItems(images) {
    return images.map(({original,preview,description}) => {
        return ` <li class="gallery__item">
<a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li> `
    }).join('');
    
    }



function openModalOnClick(e) {
    e.preventDefault()

    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
    modal.classList.add('is-open');
  const urlOriginalImage = e.target.dataset.source;
    modalImg.src = urlOriginalImage;
 
    window.addEventListener('keydown', closeModalOnEsk);
    window.addEventListener('keydown', onOverleyClick);
}



function closeModalOnClick() {
    modal.classList.remove('is-open');
    modalImg.src = '';
    
    window.removeEventListener('keydown', closeModalOnEsk);
    window.removeEventListener('keydown',onOverleyClick);
}
 
function onOverleyClick(e) {
    if (e.currentTarget===e.target) {
        closeModalOnClick()
    }
}
function closeModalOnEsk(e) {
     if(e.code==="Escape"){
          closeModalOnClick();
     }

}
