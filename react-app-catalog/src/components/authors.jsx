import React, { Component } from 'react';
import { getAuthors, searchAuthor } from "../services/authors";

import PageHeader from "./common/pageHeader";
import AuthorCard from "./common/authorCard";
import SearchForm  from "./common/searchForm";

class Authors extends Component {
    state = { 
        authors: [],
        term:"",
        error:""
     };

     async componentDidMount(){
        try{
           let data = await getAuthors();
           this.setState({ authors: data });
        } catch (err) {
         this.setState({ error: "Currently No authors..." });
        }
    };

    onSearchChange = ({ currentTarget: input }) => {
        let { term } = this.state;
        term = input.value;
        this.setState({ term });
    }

     async onSearchBtn(){
        let { term, authors } = this.state;
        if(!term) return window.location = "/author-gallery";
         try{
        let data = await searchAuthor(term);
        authors = data;
        this.setState({ authors });
        } catch (err){
        this.setState({ error: "Currently No authors..." });
        }
    }
    
    onKeyEnter = event => {
        if(event.key === "Enter"){
        return this.onSearchBtn();
        }
    };


    render() { 

        const { authors, error } = this.state;
        
        return ( 
            
            <div className="container">
                <React.Fragment>
                <PageHeader title="Authors" desc="All of our best authors." />
                <div className="row" onKeyDown={this.onKeyEnter}>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8" >
                    <SearchForm  term="&#128269; Search Author Name..."  onSearchBtn={() => this.onSearchBtn()} onChange={this.onSearchChange}/>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
             <div className="row">
                {authors[0] && authors.map( author => (
                  <AuthorCard key={author.id} author={author} />
                ))}{error && <i> {error} </i> }
             </div>
             </React.Fragment>      
            </div>
          
         );
    }
}
 
export default Authors;