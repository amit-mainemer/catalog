import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import adminService from "../services/admin";
import moment from "moment";

class AdminBooksTable extends Component {
    state = {  }

    datePipe(dateTemplate) {
        let date = moment(dateTemplate).format("L");
        return date;
    }

    delBook = async ( bookId ) =>{
      try{
        await adminService.deleteBook(bookId);
        alert('book deleted')
        window.location.replace('http://localhost:3000/admin-page');
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
        alert(ex.response.data);
        }
      }
    }


    render() { 
        const {books} = this.props;
        return ( 
            <table className="table table-borderd ">
            <thead>
                <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Uploded</th>
                <th>Author</th>
                <th>edit</th>
                </tr>
            </thead>
            <tbody>
                {books.map( book => (
                  <tr key={book.id}>
                      <td>{ book.id }</td>
                      <td>{ book.name }</td>
                      <td>{this.datePipe( book.created_at) }</td>
                      <td>{ book.first_name + " " + book.last_name }</td>
                      <td> 
                        <Link to={"/edit/book/" +  book.id }>
                        <button className="btn btn-primary btn-sm mr-3 book-edit">
                            <i className="fas fa-pen "></i>
                        </button>
                        </Link> 
                          <button
                          className="btn btn-danger btn-sm"
                           onClick={() => this.delBook(book.id)}>
                            <i className="fas fa-trash-alt" ></i>
                          </button> 
                      </td>
                  </tr>
                ))}
            </tbody>
        </table>
         );
    }
}
 
export default AdminBooksTable;