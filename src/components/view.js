import React from 'react';

function View(props) {
  const display = props.data && props.data.map((d,i) => {
    return (
      <div className="project" key={i}>
        <h4>{d.name}</h4>
        {d.country}
      </div>
    )
  })

  return (
    <div className="view">
      <h1>This is View</h1>
      {display}
    </div>
  );
}

export default View;
