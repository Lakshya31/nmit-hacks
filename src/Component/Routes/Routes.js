import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import BG from "../../Images/BG.jpg";

const Headers = [
    "Route",
    "Origin",
    "Destination",
    "Distance",
    "Departure from Origin",
    "Arrival at Destination",
    "Departure from Destination",
    "Arrival at Origin",
    "Bus Stops En Route",
]

const keys = [
    "id",
    "origin",
    "destination",
    "distance",
    "departure_from_Origin",
    "arrival_at_destination",
    "departure_from_destination",
    "arrival_at_origin",
    "stops",
]

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Routes: [],
        }
        this.getData();
    }

    getData = () => {
        fetch("http://127.0.0.1:5000/routes", {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(resp => {
                this.setState({ Routes: resp.result })
            })
            .catch(err => {
                // alert("Error!")
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <div>
                    <img src={BG} alt="Loading BG" className="backgroundimage"></img>
                </div>
                <div className="Cards">

                </div>
            </div>
        )
    }
}
