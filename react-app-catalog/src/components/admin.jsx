import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import PageHeader from "./common/pageHeader";
import AdminSearch from "./adminBooks";

class Admin extends Component {
    state = {  }

    render() { 
        return ( 
            <div className="container">
                <React.Fragment>
                <PageHeader title="Welcome Admin" desc="Search and edit your books."/>
                        <p className="text-center mb-4"><NavLink to="/admin-page">Books</NavLink>&nbsp; | &nbsp;<NavLink to="/admin/authors">Authors</NavLink></p>
                    <AdminSearch />
                </React.Fragment>
            </div>
         );
    }
}
 
export default Admin;