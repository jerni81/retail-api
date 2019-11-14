import React, { useState, useEffect} from 'react';
import SideBar from './sidebar'
import View from './view'
import axios from 'axios'

function Main() {
  const [go, setGO] = useState({go: true})
  const [show, setShow] = useState({show :''})
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
        setJapan(japan => [...japan, jDistillery])
      } if (d.country === 'Scotland') {
        let sDistillery = {
          name: d.name,
          country: d.country,
          key: i
        }
        setScotland(scotland => [...scotland, sDistillery])
      }
    })
    return list
  }

  useEffect(()=>{
    shwList();
    if (go.go === true) {
      getData()
      setGO({go: false})
    }
  })

  const shwList = () => {
    if (show.show === 'japan') {
      japan && japan.map((d,i) => {
        return (
          <div className="project" key={i}>
            <h4>{d.name}</h4>
            {d.country}
          </div>
        )
      })
    } if (show === 'scotland') {
      scotland && scotland.map((d,i) => {
        return (
          <div className="project" key={i}>
            <h4>{d.name}</h4>
            {d.country}
          </div>
        )
      })
    } else {
      return (
        <div >
          <h4>Make a Choice</h4>
        </div>
      )
    }
  }

  const shwJapan = () => {
    setShow({show:'japan'})
  }

  const shwScotland = () => {
    setShow({show:'scotland'})
  }

  return (
    <div className="main">
      <SideBar shwJapan={()=>shwJapan()} shwScotland={()=>shwScotland()}/>
      <View shwList={shwList()}/>
    </div>
  );
}

export default Main;
