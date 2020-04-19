import React from 'react';

const PageHeader = ({ title, desc }) => {
    return ( 
        <div className="row">
            <div className="col-12 mt-4 text-center">
              <h1 className="display-4 mb-3 text-center text-indigo">{ title }</h1>
              <p className="text-center mb-4 lead">{ desc }</p>
            </div>
        </div>
     );
}
 
export default PageHeader;