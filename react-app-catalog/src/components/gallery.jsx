import React, { Component } from 'react';
import { getBooks, searchBook } from "../services/books";

import BookCard from "./common/bookCard";
import SearchForm from "./common/searchForm";



class Gallery extends Component {
    state = { 
        books:[],
        term:"",
        error:""
     }

     async componentDidMount(){
         try{
            let data = await getBooks(1);
            this.setState({ books: data })
         } catch (err) {
           this.setState({ error: "Currently no books..." })
         }
     };

     onSearchChange = ({ currentTarget: input }) => {
        let { term } = this.state;
        term = input.value;
        this.setState({ term });
    }

    onKeyEnter = event => {
        if(event.key === "Enter"){
            return this.onSearchBtn();
        }
    }

     async onSearchBtn(){
        let { term, books } = this.state;
        if(!term) return window.location = "/";
         try{
        let data = await searchBook(term);
        books = data;
        this.setState({ books })
        } catch (ex){
        this.setState({ error: "Currently no books..." })
        }
    }

    async onNextPage(page){
        try{
            let data = await getBooks(page);
            this.setState({ books: data })
        }catch (ex){
            this.setState({ error: "Currently no books..." })
        }
    }

    render() { 

        const { books, error } = this.state;

        return ( 
            <React.Fragment>
                <div className="row" onKeyDown={this.onKeyEnter}>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <SearchForm  term="&#128269; Search Book Name..."  onSearchBtn={() => this.onSearchBtn()} onChange={this.onSearchChange}/>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
                <div className="row">
                   {books[0] && books.map( book => (
                     <BookCard key={ book.id } book={book} />
                   ))}{error  && <i> { error } </i> }
                   </div>
                   <div className="row">
                       <div className="col-12  text-center mb-3">
                       <span className="text-indigo page-num mr-2" onClick={() => this.onNextPage(1)}>1</span>/
                       <span className="text-indigo page-num mx-2" onClick={() => this.onNextPage(2)}>2</span>/
                       <span className="text-indigo page-num ml-2" onClick={() => this.onNextPage(3)}>3</span>
                       </div>
                   </div>
            </React.Fragment>
         );
    }
}
 
export default Gallery;