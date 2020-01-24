import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BG from "../../Images/BG.jpg";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={BG} alt="Loading BG" className="backgroundimage"></img>
        </div>
        <div className="HeadingContainer">
          <h1 className="Heading">BU.SC.OP.</h1><br></br>
          <div style={{ display: "inline-block" }}>
            <h3 className="Heading2">by</h3>
          </div>
          <div style={{ display: "inline-block", marginLeft: "10px" }}>
            <h2 className="TeamName">TecRidge</h2>
          </div>
        </div>
        <div style={{ marginTop: "40px" }}>
          <Link to="/routes" className="btn btn-light">View Routes!</Link>
        </div>
      </div>
    )
  }
}
