export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        const BASE_URL = 'https://pixabay.com/api';
        const key = '22012184-6924baf220c56a628f4f15ef2';
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}&key=${key}`;
        // const options = {
        //     // method: 'GET',
        //     headers: {
        //         // 'Content-Type' : 'image/jpeg'
                
        //     },
        //     // body: JSON.stringify()
        // };
    
        return fetch(url)
        .then(res => res.json())
        .then(({ hits }) => {
            this.incrementPage();

            return hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
}