import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import adminService from "../services/admin";
import moment from "moment";

class AdminAuthorsTable extends Component {

    state= {
        date: ""
    }

    datePipe(dateTemplate) {
        let date = moment(dateTemplate).format("L");
        return date;
    }

    delAuthor = async ( authorId ) =>{
        try{
          await adminService.deleteAuthor(authorId);
          alert('Author deleted!')
          window.location.replace('http://localhost:3000/admin/authors');
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
          alert(ex.response.data);
          }
        }
      }

    render(){

        const { authors } = this.props;
        
         return ( 
             <table className="table table-borderd">
             <thead>
                 <tr>
                 <th>No.</th>
                 <th>First Name</th>
                 <th>Last Name</th>
                 <th>Email</th>
                 <th>Phone</th>
                 <th>Register</th>
                 <th>Edit</th>
                 </tr>
             </thead>
             <tbody>
                 {authors.map( author => (
                   <tr key={author.id}>
                       <td> {author.id} </td>
                       <td> {author.first_name} </td>
                       <td> {author.last_name} </td>
                       <td> {author.email} </td>
                       <td> {author.phone} </td>
                       <td> {this.datePipe(author.created_at)} </td>
                       <td>
                             <Link to={ "/edit/author/" + author.id }>
                             <button className="btn btn-primary btn-sm mr-3 author-edit">
                                 <i className="fas fa-pen "></i>
                             </button>
                             </Link> 
                               <button 
                               className="btn btn-danger btn-sm" 
                               onClick={() => this.delAuthor(author.id)}>
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
 
export default AdminAuthorsTable;