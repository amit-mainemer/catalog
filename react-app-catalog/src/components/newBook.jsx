import React from 'react';
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import adminService from "../services/admin";
import { getAuthors } from "../services/authors";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";


class NewBook extends Form {
    state = { 
        data: {
            name:"",
            book_image:"",
            description:""
        },
        authorId: "",
        authors:[],
        errors: {},
        error: ""
     }

     async componentDidMount(){
         try{
            const data = await getAuthors();
            this.setState({ authors: data });
         }catch(ex){
           this.setState({error: "Currently No authors..."})
         }

     }
     
     schema = {
        name:Joi.string().min(3).max(255).required().label("Book Name"),
        book_image:Joi.string().min(3).max(1024).required().label("Book Image Url"),
        description:Joi.string().min(3).max(1024).required().label("Book Description")
      };

     onHandleAuthorName = ({ currentTarget: input }) => {
      this.setState({ authorId: input.value}); 
     }

     doSubmit = async () => {
         const { data, authorId } = this.state;
         try {
            let book = {...data};
            book.authorId = authorId;
            await adminService.newBook( book );
            alert('Book Saved!');
            window.location.replace('http://localhost:3000/admin-page');
          } catch (ex) {
            if (ex.response && ex.response.status === 400) {
            alert(ex.response.data);
            }
          }
         
      };

    render() {

        const { authors, error } = this.state;

        return ( 
           <div className="container">
               <React.Fragment>
               <PageHeader title="New Book Form"/>
               <div className="row">
                   <div className="col-12">
                         <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
                             <div className="card shadow mb-4">
                                 <div className="row">
                                 <div className="col-12 text-center">
                                      <div className="card-header"> <h5> Author Name</h5></div>
                                 </div>
                                 </div>
                                 <div className="card-body p-3">
                             <div className="row p-3">
                             <select onChange={this.onHandleAuthorName} name="author_name" id="author-name" className="form-control">
                                { authors && authors.map( author => (
                                <option key={author.id} value={author.id}>
                                    {author.first_name + " " + author.last_name}
                                </option>
                                ))}{error && <i>{error} </i> }
                             </select>
                            </div>
                            </div>
                            </div>
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
                            {this.renderButton("Submit")}
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
 
export default NewBook;