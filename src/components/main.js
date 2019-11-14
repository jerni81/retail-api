import React, { useState, useEffect} from 'react';
import SideBar from './sidebar'
import View from './view'
import axios from 'axios'

function Main() {
  const [go,setGO] = useState({go: true})
  const [data, setData] = useState('')
  const [scotland, setScotland] = useState('')
  const [japan, setJapan] = useState('')

  const getData = async() => {
    const data = await axios.get('https://cors-anywhere.herokuapp.com/https://whiskyhunter.net/api/distilleries_info/')
    const list = data.data.map((d,i) => {
      if (d.country === 'Japan') {
        let jDistillery = {
          name: d.name,
          country: d.country,
          key: i
        }
        setJapan(japan=>[...japan, jDistillery])
      } if (d.country === 'Scotland') {
        let sDistillery = {
          name: d.name,
          country: d.country,
          key: i
        }
        setScotland(scotland=>[...scotland, sDistillery])
      }
    })
    console.log(japan, 'this is japan');
    return list
  }

  useEffect(()=>{
    if (go.go === true) {
      getData()
      setGO({go: false})
    }
  })


  return (
    <div className="main">
      <SideBar data={data} />
      <View data={data}/>
    </div>
  );
}

export default Main;
