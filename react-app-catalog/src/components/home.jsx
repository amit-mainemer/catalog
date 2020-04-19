import React, { Component } from 'react';

import Gallary from "./gallery";
import PageHeader from "./common/pageHeader";

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
                <PageHeader title="Book Catalog" desc="Search your favorite Book!"/>       
                <Gallary />
            </div>
         );
    }
}
 
export default Home;