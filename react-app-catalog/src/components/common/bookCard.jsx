import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from "moment";

class BookCard extends Component {
    state = { };

     datePipe(dateTemplate) {
        let date = moment(dateTemplate).format("L");
        return date;
    };

    render() { 

        const { book } = this.props;

        return ( 
            <div  className="col-lg-4 mb-4">
                <div className="card shadow" >
                <img src={ book.book_image } className="card-img-top" style={{height: 250} } alt={book.name} />
                <div className="card-header font-weight-bold"> <Link className="text-primary book-link" to={"/book/" + book.id }> { book.name } </Link></div>
                    <div className="card-body">
                        <div className="card-title"><i className="fas fa-user-graduate text-brown"></i> { book.first_name + " " + book.last_name } </div>
                        <div className="card-text mb-2 font-italic">  { book.description  } </div>
                        <span className="float-right text-muted"> { this.datePipe(book.created_at) }  </span>
                    </div>
                </div>

                

            </div>
         );
    }
}
 
export default BookCard;