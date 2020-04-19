import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
    state = {  }
    render() { 

        const { admin } = this.props;

        return ( 
            <nav className="navbar navbar-expand-lg navbar-dark text-white bg-indigo">
                <div className="container">
             <Link className="navbar-brand" to="/" >Book <i className="fas fa-book-open"></i> Catalog </Link>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav mr-auto">
                 <li className="nav-item" >
                   <NavLink to="/author-gallery" className="nav-link">Authors</NavLink>
                 </li>
               </ul>
               <ul className="navbar-nav ml-auto">
                   {!admin && (
                    <li className="nav-item">
                    <Link to="/sign-in" className="nav-link">Sign In</Link>
                  </li>
                  ) }
                  {admin && (
                      <React.Fragment>
                      <li className="nav-item">
                      <NavLink to="/logout" className="nav-link">Logout </NavLink>
                    </li>
                      <li className="nav-item">
                      <NavLink to="/admin-page" className="nav-link">{admin.email}</NavLink>
                    </li>
                    </React.Fragment>
                  )}
                
               </ul>
             </div>
             </div>
           </nav>
         );
    }
}
 
export default Navbar;