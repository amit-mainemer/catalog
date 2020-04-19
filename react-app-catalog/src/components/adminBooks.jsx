import React, { Component } from 'react';
import { getBooks,searchBook } from "../services/books";
import SearchForm  from './common/searchForm';
import AdminBooksTable from "./adminBooksTable"; 
import { Link } from 'react-router-dom';


class AdminSearch extends Component {
    state = { 
        books:[],
        term: "",
        error: ""
     }

     async componentDidMount(){
        try{
            let data = await getBooks(1);
            this.setState({ books: data })
         } catch (err) {
           this.setState({ error: "Currently No books" })
         }
     }

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
        if(!term) return window.location ="/admin-page";
         try{
        let data = await searchBook(term);
        books = data;
        this.setState({ books })
        } catch (err) {
         this.setState({ error: "Currently No books" })
        }
    }
    

    render() { 

        const { books, error } = this.state;

        return ( 
          <React.Fragment>
              <div className="row" >
                  <div className="col-lg-9" onKeyDown={this.onKeyEnter}>
              <SearchForm term="Search Book..."  onSearchBtn={() => this.onSearchBtn()} onChange={this.onSearchChange}  />
              </div>
              <div className="col-lg-3">
                  <Link to="/new/book" className="btn btn-success mb-3 float-right">  <i className="fas fa-plus-circle"></i> Add Book </Link>
                </div>
              </div>
                <div className="row">
                  <div className="col-12 books-table">
                      {books[0] && <AdminBooksTable books={books} /> }
                      {error && <i>{ error }</i>}
                  </div>
              </div>
          </React.Fragment>
         );
    }
}
 
export default AdminSearch;