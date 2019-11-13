import React, { useState, useEffect }from 'react';
import axios from 'axios';

function SideBar() {

const [data, setData] = useState({})

const getData = async() => {
  const data = await axios.get('https://my.api.mockaroo.com/retail.json?key=b31b35d0')
  console.log(data, 'this is data');
  setData(data)
  return data
}

useEffect(()=>{
})

const getThis = () => {
  getData()
}

const getThat = () => {
  console.log(data);
}

  return (

    <div className="sidebar">
      <button onClick={getThis}>This</button>
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
