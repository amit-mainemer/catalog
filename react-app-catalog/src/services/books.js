import axios from "axios";

export function getBooks(page){
    return axios({
        "method": "GET",
        "url": "http://localhost:3900/books?page=" + page,
    }).then(response => response.data );
};

export function getBook(id){
    return axios({
        "method": "GET",
        "url": 'http://localhost:3900/books/' + id,
    }).then(response => response.data );
}

export function searchBook(term){
return axios({
    "method": "GET",
    "url": 'http://localhost:3900/books/search/' + term,
}).then(response => response.data)
}