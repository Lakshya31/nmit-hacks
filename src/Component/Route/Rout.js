import React, { Component } from 'react';
import axios from "axios";
import Map from "../MapComp/Map";
import BG from "../../Images/BG.jpg";
import { Link } from "react-router-dom"
import { Card, CardBody, CardTitle, CardSubtitle, Badge, CardHeader } from "shards-react"
export default class Rout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null
        }
    }

    componentDidMount() {
        const rid = this.props.match.params.rid;
        axios.get("http://127.0.0.1:5000/route/" + rid)
            .then(res => {
                this.setState({ data: res["data"]["result"] })
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        let view;
        const { data } = this.state;
        if (this.state.data) {
            const newDat = this.state.data.stops.map(obj => {
                return {
                    latitude: obj.latlons[0],
                    longitude: obj.latlons[1],
                    city: obj.busstop
                }
            })

            view = <div>
                <div className="row" style={{ margin: "auto" }}>
                    <div className="col-md-2" style={{ margin: "auto" }}>
                    </div>
                    <div className="col-md-4">
                        <Card>
                            <CardBody>
                                <CardTitle>Route {data.route_no}</CardTitle>
                                <CardSubtitle>Path Taken</CardSubtitle>
                                <Badge theme="success">{data.origin}</Badge> - <Badge theme="danger">{data.destination}</Badge>
                                <div style={{ maxHeight: "187px", overflowY: "scroll" }}>
                                    {
                                        data.stops.map((obj, i) => {
                                            return <Badge theme="info">{obj.busstop}</Badge>
                                        })
                                    }
                                </div>
                            </CardBody>
                        </Card>           >
                    </div>
                    <div className="col-md-6">
                        <Map stops={newDat} />
                    </div>
                </div>

                <div className="row" style={{ margin: "auto" }}>
                    <div className="col-md-2" style={{ margin: "auto" }}>
                    </div>
                    <div className="col-md-4" style={{ margin: "auto" }}>
                        <Card>
                            <CardHeader> <CardSubtitle> <Badge theme="success">{data.origin}</Badge> - > <Badge theme="danger">{data.destination}</Badge>
                            </CardSubtitle></CardHeader>
                            <CardBody>

                                <div style={{ maxHeight: "150px", overflowY: "scroll" }}>
                                    {
                                        data.departure_from_origin.map((obj, i) => {
                                            return <div><Badge theme="success">{obj}
                                            </Badge>     -     <Badge theme="danger">{data.arrival_at_destination[i]}</Badge></div>
                                        })
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-4" style={{ margin: "auto" }}>
                        <Card>
                            <CardHeader>
                                <CardSubtitle>
                                    <Badge theme="danger">{data.destination}</Badge> - > <Badge theme="success">{data.origin}</Badge>
                                </CardSubtitle>
                            </CardHeader>
                            <CardBody>
                                <div style={{ maxHeight: "150px", overflowY: "scroll" }}>
                                    {
                                        data.departure_from_destination.map((obj, i) => {
                                            return <div><Badge theme="success">{obj}
                                            </Badge>     -     <Badge theme="danger">{data.arrival_at_origin[i]}</Badge></div>
                                        })
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-2" style={{ margin: "auto" }}>
                    </div>
                </div>
                <div>
                    <Link to={`/optimise/${this.props.match.params.rid}`} style={{ margin: "auto", marginTop: "20px" }} className="btn btn-primary">Optimise</Link>
                </div>
            </div>
        } else {
            view = <div class="spinner-grow text-warning"></div>
        }
        return (
            <div>
                <div>
                    <img src={BG} alt="Loading BG" className="backgroundimage"></img>
                </div>
                {view}
            </div>
        )
    }
}
