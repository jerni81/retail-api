import React from 'react';

function View(props) {

  return (
    <div className="view">
      <h1>This is View</h1>
      {props.shwList}
    </div>
  );
}

export default View;
