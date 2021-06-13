import './sass/main.scss';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { clickOnImg } from './js/lightbox.js';
import LoadMoreButton from './js/load-more.js';

import ApiService from "./js/apiService";
import pictureCardTpl from "./templates/pictureCardTpl.hbs"

const refs = {
    galleryEl: document.querySelector('.gallery-container'),
    searchForm: document.querySelector('#search-form'),
    btnSearch: document.querySelector('#search-btn'),
}

const loadButton = new LoadMoreButton({ 
    selector: '#load-more-btn',
    hidden: true,
});

const apiService = new ApiService()

refs.searchForm.addEventListener('submit', onSearch )
loadButton.refs.button.addEventListener('click', fetchImages);
refs.galleryEl.addEventListener('click', clickOnImg);

function onSearch(e) {
        e.preventDefault();
    
        apiService.query = e.currentTarget.elements.query.value;
        const searchTrimImg = apiService.query.trim();

    if (searchTrimImg === '') {
        loadButton.disableBtn();
        return noSearchWord();
    }

    loadButton.show();
    apiService.resetPage();
    clearGalleryMarkup();
    fetchImages(); 
}

function fetchImages() {
    loadButton.disableBtn();
    apiService.fetchArticles().then(hits => {
        appendArticlesMarkup(hits);
        loadButton.enableBtn();
        smoothScrolling();

        if(hits.length === 0) {
            loadButton.hide();
            onError();
        }
    });
}

function appendArticlesMarkup(hits) {
    refs.galleryEl.insertAdjacentHTML('beforeend', pictureCardTpl(hits))
}


function clearGalleryMarkup() {
    refs.galleryEl.innerHTML = '';
}

function smoothScrolling() {
    try {
        refs.galleryEl.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })  
         } catch {
        console.log(onError);
     }
};

function onError() {
    error({
        text: 'Try Again!',
        delay: 2000,
    });
}

function noSearchWord() {
    error({
        text: 'Please enter the search key',
        delay: 2000,
    });
}