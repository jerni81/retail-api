import React, { useState, useEffect }from 'react';

function SideBar(props) {


  return (

    <div className="sidebar">

      <button onClick={props.getData}>That</button>
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
