import React from 'react';
import adminService from "../services/admin";
import { getBook } from "../services/books";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "./common/form";

import PageHeader from "./common/pageHeader";

class EditBook extends Form {
    state = { 
        data:{
            name:"",
            book_image:"",
            description:""
        },
        errors: {}
     }

    async componentDidMount(){
        const bookId = this.props.match.params.id;
        const data  = await getBook(bookId);
        this.setState({ data: this.mapToViewModel(data[0])});
      }

      mapToViewModel(book) {
        return {
             name: book.name,
             book_image: book.book_image,
             description: book.description
        };
      }

      schema = {
        name:Joi.string().min(3).max(255).required().label("Book Name"),
        book_image:Joi.string().min(3).max(1024).required().label("Book Image Url"),
        description:Joi.string().min(3).max(1024).required().label("Book Description")
      }

      doSubmit = async () => {
          const { data } = this.state;
          const bookId = this.props.match.params.id;
      try {
           await adminService.updateBook(bookId, data);
           alert('book saved');
           window.location.replace('http://localhost:3000/admin-page');
         } catch (ex) {
           if (ex.response && ex.response.status === 400) {
           alert(ex.response.data);
           }
         }  
    }

    render() { 

        return ( 
            <div className="container"> 
                <React.Fragment>
                <PageHeader title="Edit book" desc="Update book info" />
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
                        <div className="card mt-4 shadow">
                                     <div className="row">
                                         <div className="col-12 text-center">
                                             <div className="card-header"> <h5>Book Info</h5> </div>
                                         </div>
                                     </div>
                                     <div className="card-body p-3">
                            <div className="row">
                                <div className="col-lg-6">
                                    { this.renderInput("name", "Book Name","name")}
                                </div>
                                <div className="col-lg-6">
                                    { this.renderInput("book_image", "Book Image Url", "book_image")}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                {this.renderInput("description", "Book Description","textarea")}
                                </div>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center my-3">
                                <Link to="/admin-page">
                                   <button className="btn btn-secondary mr-3">Back</button>
                                </Link>
                            {this.renderButton("Update Book")}
                            </div>
                            </div>
                            </div>

                        </form>
                    </div>
                </div>
                </React.Fragment>
            </div>   
         );
    }
}
 
export default EditBook;