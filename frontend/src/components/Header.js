import React from 'react';

const Header = ({ setPage }) => {
  return (
    <header>
      <nav>
        <ul>
          <li><button onClick={() => setPage('home')}>Home</button></li>
          <li><button onClick={() => setPage('crud')}>Shoes Buyer</button></li>
          <li><button onClick={() => setPage('contact')}>Contact</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;