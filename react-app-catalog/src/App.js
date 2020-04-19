import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import adminService from "./services/admin";

import Navbar from "./components/navbar";
import Home from "./components/home";
import Footer from "./components/footer";
import Book from "./components/book";
import Authors from "./components/authors";
import SignIn from "./components/signin";
import Admin from "./components/admin";
import Logout from "./components/logout";
import NewBook from "./components/newBook";
import NewAuthor from "./components/newAuthor";
import AdminAuthors from "./components/adminAuthors";
import EditBook from "./components/editBook";
import EditAuthor from "./components/editAuthor";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component{

  state= {};

  componentDidMount(){
    const admin = adminService.getCurrentAdmin();
    this.setState({ admin })
  }
  

  render(){

    const { admin } = this.state;

   return (
      <React.Fragment>
        <header>
          <Navbar admin={ admin } />
        </header>
         <main style={{ minHeight: 900 }}>
           <Switch>
           <ProtectedRoute path="/edit/author/:id" component={EditAuthor}/>
           <ProtectedRoute path="/edit/book/:id" exact component={EditBook}/>
           <ProtectedRoute path="/admin/authors" component={AdminAuthors} />
           <ProtectedRoute path="/new/author" component={NewAuthor} />
           <ProtectedRoute path="/new/book" exact component={NewBook} />
           <Route path="/logout" component={Logout} />
           <ProtectedRoute path="/admin-page" component={Admin} />
           <Route path="/sign-in" component={SignIn} />
           <Route path="/author-gallery" component={Authors} />
           <Route path="/book/:id" component={Book} />
           <Route path="/" exact component={Home} />
         </Switch>
         </main>
        <footer>
          <Footer />
        </footer>
     </React.Fragment>
   );
}
}

export default App;
