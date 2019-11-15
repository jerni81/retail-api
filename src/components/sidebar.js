import React from "react";

function SideBar(props) {
  return (
    <div className="sidebar">
      <h4>Which country would you like your scotch from?</h4>
      <button onClick={props.shwJapan}>Japan</button>
      <br />
      <button onClick={props.shwScotland}>Scotland</button>
    </div>
  );
}

export default SideBar;
