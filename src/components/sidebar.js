import React, { useState, useEffect }from 'react';

function SideBar(props) {

const getThat = () => {
  console.log(props.data, 'this is state');
}

  return (

    <div className="sidebar">

      <button onClick={getThat}>That</button>
      <ul>
        <li>This</li>
        <li>That</li>
        <li>The Other</li>
        <li>One More</li>
      </ul>
    </div>
  );
}

export default SideBar;
