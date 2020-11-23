import React, { Component } from 'react';
import {searchAuthor, getAuthors} from "../services/authors";
import { Link } from "react-router-dom";

import SearchForm from "./common/searchForm";
import AdminAuthorsTable from "./adminAuthorsTable"; 
import PageHeader from "./common/pageHeader";


class AdminAuthors extends Component {
    state = { 
        authors:[],
        term: "",
        error: ""
     }


     async componentDidMount(){
        try{
            let data = await getAuthors();
            this.setState({ authors: data })
         } catch (err) {
           this.setState({error: "Currently No authors..."});
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
        let { term, authors } = this.state;
        if(!term) return window.location = "/admin/authors";
        try {
        let data = await searchAuthor(term);
        authors = data;
        this.setState({ authors });
        } catch (err) {
         console.log(err);
        }
    }


    
    render() { 

        const { authors, error} = this.state;

        return ( 
              <div className="container">
                  <React.Fragment>
               <PageHeader title="Admin" desc="search and edit your authors." />
                  <p className="text-center mb-4"><Link to="/admin-page">Books</Link>&nbsp; | &nbsp;<Link to="/admin/authors">Authors</Link></p>
              <div className="row">
                  <div className="col-lg-9" onKeyDown={this.onKeyEnter}>
              <SearchForm term="Search author..."  onSearchBtn={() => this.onSearchBtn()} onChange={this.onSearchChange}  />
              </div>
              <div className="col-lg-3">
                  <Link to="/new/author">
                  <button className="btn btn-success mb-3 float-right">
                       <i className="fas fa-plus-circle"></i> Add author 
                       </button>
                 </Link>
                </div>
              </div>
                <div className="row">
                  <div className="col-12 authors-table">
                      {authors[0] && <AdminAuthorsTable authors={authors} />}
                      {error && <i>{ error }</i>}
                  </div>
              </div>
              </React.Fragment>
              </div>
           
         );
                  }
};
 
export default AdminAuthors;

