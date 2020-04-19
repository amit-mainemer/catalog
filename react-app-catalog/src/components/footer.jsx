import React from 'react';

const Footer = () => {
    return ( 
        <p className="bg-indigo py-3 text-center  text-white mb-0">
            Book Catalog &copy; { new Date().getFullYear() }
        </p>
     );
}
 
export default Footer;