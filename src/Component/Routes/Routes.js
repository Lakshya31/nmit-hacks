import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BG from "../../Images/BG.jpg";
import { Card } from 'react-bootstrap';

const Headers = [
    "Origin",
    "Destination",
    "Distance",
]

const keys = [
    "origin",
    "destination",
    "distance",
]

export default class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Routes: [],
            AllRoutes: []
        }
        this.getData();
    }

    Filter = (search) => {
        if (search) {
            let Temp = []
            this.state.AllRoutes.forEach(route => {
                if (route.route_no.toLowerCase().includes(search.toLowerCase())) {
                    Temp.push(route)
                }
            })
            this.setState({ Routes: Temp })
        }
        else {
            this.setState({ Routes: this.state.AllRoutes })
        }
    }

    SearchChange = (event) => {
        this.Filter(event.target.value)
    }

    getData = () => {
        fetch("http://127.0.0.1:5000/routes", {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then(resp => {
                console.log(resp.result)
                this.setState({ AllRoutes: resp.result }, function () {
                    this.Filter("");
                })
            })
            .catch(err => {
                // alert("Error!")
                console.log(err)
            })
    }

    render() {
        if (this.state.Routes === []) {
            return (
                <div>
                    <div>
                        <img src={BG} alt="Loading BG" className="backgroundimage"></img>
                    </div>
                    <div style={{ margin: "auto" }}>
                        <h1 className="Heading">Loading...</h1>
                    </div>
                </div>

            )
        }
        return (
            <div>
                <div>
                    <img src={BG} alt="Loading BG" className="backgroundimage"></img>
                </div>
                <div>
                    <input autoComplete="off" className="SearchBox rounded" onChange={this.SearchChange} placeholder="Search Route..." />
                </div>
                <div className="Cards">
                    {
                        this.state.Routes.map(route => {
                            return <Link key={route.id} to={`/route/${route.id}`} className="shadow-sm m-3 bg-dark rounded">
                                <Card className="CardItself z-depth-5" key={route.id} style={{ height: "187px", width: '18rem', display: "inline-block", margin: "20px" }}>
                                    <Card.Body>

                                        <Card.Title>{`Route ${route.route_no}`}</Card.Title>
                                        <hr style={{ border: "2px solid black" }}></hr>
                                        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                        <Card.Text className="CardText">
                                            {
                                                Headers.map((header, i) => {
                                                    return <span key={i}>{`${header} : ${route[keys[i]]}`}<br></br></span>
                                                })
                                            }
                                        </Card.Text>
                                        {/* <Card.Link href="#">Card Link</Card.Link>
                                            <Card.Link href="#">Another Link</Card.Link> */}
                                    </Card.Body>
                                </Card>
                            </Link>
                        })
                    }
                </div>
                {/* <div className="Cards">
                    <Card className="">
                        <CardContent>
                            <Typography className="" color="textSecondary" gutterBottom>
                                Word of the Day
                            </Typography>
                            <Typography variant="h5" component="h2">
                                be
                            </Typography>
                            <Typography className="" color="textSecondary">
                                adjective
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                            <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                    </Card>
                </div> */}

            </div>
        )
    }
}
