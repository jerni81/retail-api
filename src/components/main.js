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

  // Axios API call to render data into different categories
  const getData = async () => {
    const data = await axios.get(
      "https://cors-anywhere.herokuapp.com/https://whiskyhunter.net/api/distilleries_info/"
    );
    // maps data into objects and seperates them by country, then uses a
    // spread operator to add them to the correct array
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

  // this is the logic that determines is the API call needs to be made
  // and if so calls it, it then updates state for go to indicate the
  // call has been made
  useEffect(() => {
    if (go.go === true) {
      getData();
      setGO({ go: false });
    }
  }, [go.go]);

  // Rendering List in View

  // This checks to see if japan is empty, to see if the API call has
  // returned any data yet, if not it send a message to view asking the
  //to "Please wait", if so it directs the user to "make a choice"
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

    // This logic checks to see if the the state of show has been been
    // updated  to either "japan" or "scotland" so as to render the correct
    // list in the view component
    if (show.show === "japan") {
      return (
        japan &&
        japan.map((d, i) => {
          return (
            // this is a ternary statement to dynamically render the className
            // for each div created in the map function
            <div
              className={selected.name === d.name ? "selectedItem" : "listItem safari_only" }
              key={i}
            >
              <h3>{d.name}</h3>
              <h5>{d.country}</h5>
              // this shows more info on whiskies while item is selected
              <div className={selected.name === d.name? "show" : "noShow"}>
                <b>Rating: {d.rating}</b>
                <b># of Whiskies: {d.whiskies}</b>
              </div>
              // this onClick changes the state of selectes to dynamically
              // render the className which creates an individual item view
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
            // this is a ternary statement to dynamically render the className
            // for each div created in the map function
            <div
              className={selected.name === d.name ? "selectedItem" : "listItem safari_only" }
              key={i}
            >
              <h3>{d.name}</h3>
              <h5>{d.country}</h5>
              // this shows more info on whiskies while item is selected
              <div className={selected.name === d.name ? "show" : "noShow"}>
                <b>Rating: {d.rating}</b>
                <b># of Whiskies: {d.whiskies}</b>
              </div>
              // this onClick changes the state of selectes to dynamically
              // render the className which creates an individual item view
              <button onClick={(event) => shwSelected(event, d.name)}>{selected.name === d.name ? "Go Back" : "Select" }</button>
            </div>
          );
        })
      );
    }
  };

  // These are the functions passed to SideBar to create the onClick events
  const shwJapan = () => {
    setShow({ show: "japan" });
  };
  const shwScotland = () => {
    setShow({ show: "scotland" });
  };

  // This is the function that sets the selected name to create an individual
  //view for the item
  const shwSelected = (event, d) => {
    event.preventDefault();
    if (selected.name === "") {
      setSelected({ name: d });
    }
    if (selected.name === d ) {
      setSelected({ name: "" });
    }
    if (selected.name !== d && selected.name !== "") {
      setSelected({ name: d })
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
