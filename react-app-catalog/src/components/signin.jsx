import React from 'react';
import Joi from "joi-browser";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import adminService from "../services/admin";

class SignIn extends Form {
    state = { 
        data: {
            email:"",
            password:""
        },
        errors: {}
     }

     schema = {
        email: Joi.string()
          .required()
          .email()
          .label("Email"),
        password: Joi.string()
          .required()
          .min(4)
          .label("Password")
      };

      doSubmit = async () => {
        const { email, password } = this.state.data;
        try {
          await adminService.login(email, password);
          
          window.location = "/admin-page";
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            this.setState({ errors: { email: ex.response.data } });
          }
        }
      };
    render() { 
        return ( 
            <div className="container">
                <PageHeader title="Sign In" desc="Sign in as admin" />
                <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                        <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
                            <div className="card shadow ">
                                <div className="card-header text-center">
                                    <b>Admin Info</b>
                                </div>
                                <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-12">
                                    {this.renderInput("email", "Email", "email")}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                    {this.renderInput("password", "Password", "password")}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 text-center">
                                    {this.renderButton("Sign In")}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                <div className="col-lg-2"></div>
                </div>
            </div>
         );
    }
}
 
export default SignIn;