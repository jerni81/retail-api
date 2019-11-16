import React, { useState, useEffect } from "react";
import SideBar from "./sidebar";
import View from "./view";
import axios from "axios";

function Main() {
  const [go, setGO] = useState({ go: true });
  const [show, setShow] = useState({ show: "" });
  const [scotland, setScotland] = useState("");
  const [japan, setJapan] = useState("");
  const [selected, setSelected] = useState({ name: "" });

  // API call
  const getData = async () => {
    const data = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://whiskyhunter.net/api/distilleries_info/"
    );
    const list = data.data.map((d, i) => {
      if (d.country === "Japan") {
        let jDistillery = {
          name: d.name,
          country: d.country,
          rating: d.whiskybase_rating,
          whiskies: d.whiskybase_whiskies,
          key: i
        };
        setJapan(japan => [...japan, jDistillery]);
      }
      if (d.country === "Scotland") {
        let sDistillery = {
          name: d.name,
          country: d.country,
          rating: d.whiskybase_rating,
          whiskies: d.whiskybase_whiskies,
          key: i
        };
        setScotland(scotland => [...scotland, sDistillery]);
      }
    });
    console.log("running");
    return list;
  };

  useEffect(() => {
    if (go.go === true) {
      getData();
      setGO({ go: false });
    }
  }, [go.go]);

  // Rendering List in View
  const shwList = () => {
    if (japan === "") {
      return (
        <div>
          <h4>Please wait for the API :)</h4>
        </div>
      );
    }
    if (japan !== "" && show.show === "") {
      return (
        <div>
          <h4>You may now make a choice</h4>
        </div>
      );
    }
    if (show.show === "japan") {
      return (
        japan &&
        japan.map((d, i) => {
          return (
            <div
              className={selected.name === d.name ? "selectedItem" : "listItem" }
              key={i}
            >
              <h3>{d.name}</h3>
              <h5>{d.country}</h5>
              <div className={selected.name === d.name? "show" : "noShow"}>
                <b>Rating: {d.rating}</b>
                <b># of Whiskies: {d.whiskies}</b>
              </div>
              <button onClick={(event) => shwSelected(event, d.name)}>{selected.name === d.name ? "Go Back" : "Select" }</button>
            </div>
          );
        })
      );
    }
    if (show.show === "scotland") {
      return (
        scotland &&
        scotland.map((d, i) => {
          return (
            <div
              className={selected.name === d.name ? "selectedItem" : "listItem" }
              key={i}
            >
              <h3>{d.name}</h3>
              <h5>{d.country}</h5>
              <div className={selected.name === d.name ? "show" : "noShow"}>
                <b>Rating: {d.rating}</b>
                <b># of Whiskies: {d.whiskies}</b>
              </div>
              <button onClick={(event) => shwSelected(event, d.name)}>{selected.name === d.name ? "Go Back" : "Select" }</button>
            </div>
          );
        })
      );
    }
  };

  const shwJapan = () => {
    setShow({ show: "japan" });
  };
  const shwScotland = () => {
    setShow({ show: "scotland" });
  };

  // Rendering selected items
  const shwSelected = (event, d) => {
    event.preventDefault();
    if (selected.name === "") {
      setSelected({ name: d });
      console.log(selected.name);
    }
    if (selected.name === d ) {
      setSelected({ name: "" });
      console.log(selected.name);
    }
  };

  return (
    <div className="main">
      <SideBar shwJapan={() => shwJapan()} shwScotland={() => shwScotland()} />
      <View shwList={shwList()} shwSelected={shwSelected} />
    </div>
  );
}

export default Main;
