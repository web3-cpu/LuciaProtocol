import React from 'react';

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li><a className="logo" href="#">Logo</a></li>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  );
}

export default Navbar;