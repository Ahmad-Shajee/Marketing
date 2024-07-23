import React from 'react';
import './pre-view.css';

const Preview = () => {
    return (
<div className="container">
  <div className="left">
    <h2>Left Side</h2>
    <p>Some text for the left side.</p>
  </div>
  <div className="right">
    <h2>Right Side</h2>
    <p>Some text for the right side.</p>
  </div>
</div>
);
};

export default Preview;