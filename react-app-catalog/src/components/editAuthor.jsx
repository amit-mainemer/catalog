import React from 'react';
import adminService from "../services/admin";
import { getAuthor } from "../services/authors";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "./common/form";

import PageHeader from "./common/pageHeader";

class EditAuthor extends Form {
    state = { 
         data:{
            first_name:"",
            last_name:"",
            email: "",
            phone: ""
         },
         errors:{}
     }

    async componentDidMount(){
        const authorId = this.props.match.params.id;
        const data  = await getAuthor(authorId);
        this.setState({ data: this.mapToViewModel(data[0])});
      }

      mapToViewModel(auhtor) {
        return {
             first_name: auhtor.first_name,
             last_name: auhtor.last_name,
             email: auhtor.email,
             phone: auhtor.phone
        };
      }

    schema = {
        first_name:Joi.string().required().min(2).label("First Name"),
        last_name:Joi.string().required().min(2).label("Last Name"),
        email:Joi.string().required().email().label("Email Address"),
        phone:Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/).label("Phone Number")
     };

     doSubmit = async () => {
        const { data } = this.state;
        const authorId = this.props.match.params.id;
        try{
        await adminService.updateAuthor(authorId, data);
           alert('Author Saved!');
           window.location.replace('http://localhost:3000/admin/authors');
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
              <PageHeader title="Update Author" desc="Update author info" />
              <div className="row">
                  <div className="col-12">
                      <form  onSubmit={this.handleSubmit} autoComplete="off" method="POST">
                          <div className="card shadow">
                              <div className="card-header text-center"> <b> Author</b> </div>
                              <div className="card-body">
                                  <div className="row">
                                      <div className="col-lg-6">
                                      {this.renderInput("first_name","First Name", "text")}
                                      </div>
                                      <div className="col-lg-6">
                                      {this.renderInput("last_name","Last Name", "text")}
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-lg-6">
                                          {this.renderInput("email","Email Address", "email" )}
                                      </div>
                                      <div className="col-lg-6">
                                          {this.renderInput("phone","Phone Number", "tel")}
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-12 text-center mt-4">
                                          <Link to="/admin/authors">
                                            <button className="btn btn-secondary mr-3">Back</button>
                                          </Link>
                                          {this.renderButton("Submit")}
                                      </div>
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
 
export default EditAuthor;