import React, { useState } from "react";

function View(props) {
  const [selected, setSelected] = useState({ selected: false });

  return <div className="view">{props.shwList}</div>;
}

export default View;
