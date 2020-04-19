import React, { Component } from 'react';
import { getBook } from "../services/books";
import moment from "moment";

import PageHeader from "./common/pageHeader";

class Book extends Component {
    state = { 
        book: {} 
     }

     datePipe(dateTemplate) {
      let date = moment(dateTemplate).format("L");
      return date;
     };

     async componentDidMount(){

         const id = this.props.match.params.id;

         try{
            let data = await getBook(id);
            this.setState({ book: data[0] })
         } catch (err) {
           console.log(err);
         } 
     }


    render() { 
        
       const { book }  = this.state;

        return ( 
              <div className="container">
                 <PageHeader title={book.name} />
                 <div className="card mb-3 shadow">
                   <div className="row no-gutters">
                     <div className="col-md-4">
                       <img src={book.book_image} className="card-img" alt= {book.name} style={{ height: "100%" }} />
                    </div>
                    <div className="col-md-8">
                    <div className="card-header font-weight-bold"> <i className="fas fa-book text-brown"></i> { book.name } </div>
                    <div className="card-body">
                         <h5 className="card-title"><i className="fas fa fa-user-graduate text-brown"></i> Author: { book.first_name + " " + book.last_name }</h5>
                         <p className="card-text">{book.description}</p>
                         <span className="card-text"><small><i className="fas fa-clock text-brown"></i> Uploded: {this.datePipe(book.created_at)} </small></span><br/>
                         <span className="card-text"><small><i className="fas fa-history text-brown"></i> Last updated: {this.datePipe(book.updated_at)} </small></span>
                  </div>
                </div>
              </div>
            </div>
            </div>  
         );  
    }
}
 
export default Book;