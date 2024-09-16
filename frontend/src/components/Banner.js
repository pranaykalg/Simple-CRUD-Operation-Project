import React from 'react';
import myImage from './image.jpg';

const Banner = () => {
  return (
    <img src={myImage} alt="Stylish Shoes Banner" style={{ width: '100%', height: '650px' }} />
  );
};

export default Banner;