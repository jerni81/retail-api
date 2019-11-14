import React, { useState, useEffect} from 'react';
import SideBar from './sidebar'
import View from './view'
import axios from 'axios'

function Main() {

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
    console.log(list, 'this is list');
    setData(data.data)
    return list
  }

  useEffect(()=>{
    if (data === '') {
      getData()
    }
  })


  return (
    <div className="main">
      <SideBar data={data}/>
      <View data={data}/>
    </div>
  );
}

export default Main;
