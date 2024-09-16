import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-md-3 text-center">
              <h4>About Us</h4>
              <p>We are a leading shoe retailer with over 20 years of experience.</p>
            </div>
            <div className="col-md-3 text-center">
              <h4>Contact Us</h4>
              <p>Email: <a href="mailto:yourshop@gmail.com">yourshop@gmail.com</a></p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 Shoe St, Foot City, FC 12345</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <p>&copy; 2024 Shoe Website. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;