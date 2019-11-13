import React, { useState, useEffect }from 'react';
import axios from 'axios';

function SideBar() {

const [data, setData] = useState('')

const getData = async() => {
  const data = await axios.get('https://cors-anywhere.herokuapp.com/https://whiskyhunter.net/api/distilleries_info/')
  const list = data.data.map((d,i) => {
    let distillery = {
      name: d.name,
      country: d.country,
      key: i
    }
    return distillery
  })
  console.log(list);
  setData(list)
}

const display = data && data.map((d,i) => {
  return (
    <div className="project" key={i}>
      <h4>{d.name}</h4>
      {d.country}
    </div>
  )
})

useEffect(()=>{
})

const getThis = () => {
  getData()
}

const getThat = () => {
  console.log(data, 'this is state');
}

  return (

    <div className="sidebar">
      <button onClick={getThis}>This</button>
      <button onClick={getThat}>That</button>
      {display}
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
