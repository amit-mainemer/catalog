import axios from "axios";

export function getAuthors(){
    return axios({
        "method": "GET",
        "url": "http://localhost:3900/authors",
    }).then(response => response.data );
};

export function getAuthor(id){
    return axios({
        "method": "GET",
        "url": 'http://localhost:3900/authors/' + id,
    }).then(response => response.data );
}

export function searchAuthor(term){
    return axios({
        "method": "GET",
        "url": 'http://localhost:3900/authors/search/' + term,
    }).then(response => response.data);
}