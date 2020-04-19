import React, { Component } from 'react';

class SearchForm extends Component {
    state = {  }

    render() { 
        const { term, onSearchBtn, ...rest } = this.props; 
        return ( 
            <div className="input-group mb-4">
                 <input {...rest} type="text" className="form-control" aria-describedby="button-addon2"
                 placeholder={ term}  />
                 <div className="input-group-append">
                <button 
                className="btn btn-outline-primary" 
                type="button" id="button-addon2" 
               onClick={onSearchBtn}>search</button>
             </div>
            </div>
         );
    }
}
 
export default SearchForm;