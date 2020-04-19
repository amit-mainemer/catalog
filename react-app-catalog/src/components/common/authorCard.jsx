import React, { Component } from 'react';
import moment from "moment";

class AuthorCard extends Component {
    state = { }

    datePipe(dateTemplate) {
        let date = moment(dateTemplate).format("L");
        return date;
    }

    render() { 

        const { author } = this.props;

        return ( 
            <div className="col-lg-4 mb-4">
            <div className="card shadow">
            <div className="card-header font-weight-bold text-primary"> <i className="fas fa-user-edit"></i>  { author.first_name + " " + author.last_name } </div>
                <div className="card-body">
                    <div className="card-text mb-2 font-italic"> <i className="fas fa-envelope text-brown"></i> Email:  { author.email  } </div>
                    <div className="card-text mb-2 font-italic"><i className="fas fa-phone text-brown"></i> Phone: { author.phone } </div>
                    <div className="card-text mb-2 font-italic">
                        <i className="fas fa-clock text-brown"></i> Uploded:  {this.datePipe( author.created_at)} 
                    </div>
                </div>
             </div>
            </div>
         );
    }
}
 
export default AuthorCard;