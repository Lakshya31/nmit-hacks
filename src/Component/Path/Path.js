import React, { Component } from 'react'
import { StaticMap, Marker } from 'react-map-gl';
import { PhongMaterial } from '@luma.gl/core';
import { AmbientLight, MapView, PointLight, LightingEffect } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
// import { PolygonLayer } from '@deck.gl/layers';
import { TripsLayer, } from '@deck.gl/geo-layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
// import fs from "fs"
import Path2 from "./pathdata.json"
import { Card, CardBody, Ta } from "shards-react";
// import ControlPanel from "./subcompoenents/ControlPanel"
import StopPin from "./subcompoenents/StopPin"
import RouteDet from "./routedet.json"
// import Container from "./subcompoenents/Container"
import Map from "../Compare/Map"
import Optimized from "./optimisedTimings"
// import Path1 from "../Dashboard/path"
import BG from "../../Images/BG.jpg";

const MAPBOX_TOKEN = "pk.eyJ1IjoibmFtYmlhcnNpZGhhcnRoIiwiYSI6ImNrM2VsdjBsdTExOXAzbnVpcmhwanMyN3kifQ.QSt6sbifkuzfUdSz6YLoww"; // eslint-disable-line

const DATA_URL = {
  BUILDINGS:
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json', // eslint-disable-line
  TRIPS:
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips-v7.json' // eslint-disable-line
};
const DATA_URL1 = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json';

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000]
});

const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const material = new PhongMaterial({
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70]
});

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 150],
  trailColor1: [255, 0, 255],
  material,
  effects: [lightingEffect]
};

const INITIAL_VIEW_STATE = {
  latitude: 12.9716,
  longitude: 77.5946,
  // latitude: 40.71764,
  // longitude:-74.13463,
  zoom: 9,
  pitch: 45,
  bearing: 0
};

const landCover = [[[-74.0, 40.7], [-74.02, 40.7], [-74.02, 40.72], [-74.0, 40.72]]];

export default class Path extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      route: "",
      routes: [],
      selected: null,
      play: true,
      showheatmap: false,
      optimizedView: false
    };
    this.onChange = this.onChange.bind(this)
    this._renderLayers = this._renderLayers.bind(this)
    this._renderCityMarker = this._renderCityMarker.bind(this)
    this.playManip = this.playManip.bind(this)
    this.manipOptimized = this.manipOptimized.bind(this)
  }
  componentWillMount() {
    let data = []
    Path2.map(ob => {
      data.includes(ob['vendor']) ? console.log("repeating") : data.push(ob['vendor'])
    })
    this.setState({ routes: data })
  }
  componentDidMount() {
    this._animate();
    // console.log(path1)
    // fs.writeFileSync("path2.json",JSON.stringify(path1)).
  }

  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  manipOptimized() {
    this.setState({ optimizedView: !this.state.optimizedView })
  }
  _animate() {
    const {
      loopLength = 1800, // unit corresponds to the timestamp in source data
      animationSpeed = 5 // unit time per second
    } = this.props;
    const timestamp = Date.now() / 1000;
    const loopTime = loopLength / animationSpeed;
    if (this.state.play) {
      this.setState({
        time: ((timestamp % loopTime) / loopTime) * loopLength
      });
    }
    this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
  }
  _renderCityMarker = (city, index) => {
    // console.log()
    return (
      <Marker key={`marker-${index}`} longitude={parseFloat(city[0])} latitude={parseFloat(city[1])}>
        <StopPin size={20} />
      </Marker>
    );
  };
  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    console.log(d)
    return `${h}:${m}:${s}`;
  }
  playManip() {
    this.setState({ play: !this.state.play });
  }
  _renderLayers() {
    // console.log(this.state.time)
    // const path1=Object.keys(Path1).map((obj)=>{
    //     // let data = Path1[obj]
    //     return {
    //         vendor:obj,
    //         path:Path1[obj]['routes'].map(obj1=>(obj1['latlons'].reverse())),
    //         timestamps:Path1[obj].time 
    //     }
    // })
    const {
      buildings = DATA_URL.BUILDINGS,
      trips = DATA_URL.TRIPS,
      trailLength = 15,
      theme = DEFAULT_THEME,
      data1 = DATA_URL1,
      intensity = 1,
      threshold = 0.03,
      radiusPixels = 30
    } = this.props;
    let temp_path
    if (this.state.route === "") {
      temp_path = Path2;

    } else {
      temp_path = []
      temp_path = Path2.filter(obj => {
        return obj['vendor'] === this.state.route
      })
      console.log(temp_path)
      if (!this.state.selected) {
        this.setState({ selected: temp_path })
      } else {
        if (JSON.stringify(this.state.selected) !== JSON.stringify(temp_path)) {
          this.setState({ selected: temp_path })
        }
      }
    }

    return [
      // This is only needed when using shadow effects
      //   new PolygonLayer({
      //     id: 'ground',
      //     data: landCover,
      //     getPolygon: f => f,
      //     stroked: false,
      //     getFillColor: [0, 0, 0, 0]
      //   }),
      new TripsLayer({
        id: 'trips',
        data: temp_path,
        getPath: d => d.path,
        getTimestamps: d => d.timestamps,
        getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
        opacity: 0.3,
        widthMinPixels: 2,
        rounded: true,
        trailLength,
        currentTime: this.state.time,

        shadowEnabled: false
      }), (this.state.showheatmap ? new HeatmapLayer({
        data1,
        id: 'heatmp-layer',
        opacity: 1,
        pickable: false,
        getPosition: d => [d[0], d[1]],
        getWeight: d => d[2],
        radiusPixels,
        intensity,
        threshold
      }) : null)
      //   new PolygonLayer({
      //     id: 'buildings',
      //     data: buildings,
      //     extruded: true,
      //     wireframe: false,
      //     opacity: 0.5,
      //     getPolygon: f => f.polygon,
      //     getElevation: f => f.height,
      //     getFillColor: theme.buildingColor,
      //     material: theme.material
      //   })
    ];
  }


  render() {
    let markers = null
    let timeNow = this.secondsToHms(this.state.time * 86399 / 1800)
    console.log("actual", timeNow)
    if (this.state.selected) {
      markers = this.state.selected[0]['path'].map(this._renderCityMarker)
    }
    let styles = 'mapbox://styles/mapbox/streets-v11'
    // if(timeNow==="06:00:00"){
    //   styles='mapbox://styles/mapbox/light-v9'
    // }else if(timeNow==="18:00:00"){
    //   styles='mapbox://styles/mapbox/dark-v9'
    // }  
    const {
      viewState,
      mapStyle = styles,
      theme = DEFAULT_THEME
    } = this.props;
    let trailLength = 180
    // console.log(this.state.route)
    // const path1=Object.keys(Path1).map((obj)=>{
    //     // let data = Path1[obj]
    //     return {
    //         vendor:obj,
    //         path:Path1[obj]['routes'].map(obj1=>(obj1['latlons'].reverse())),
    //         timestamps:Path1[obj].time
    //     }
    // })
    // const newLayer = new TripsLayer({
    //     id: 'trips',
    //     data: path1,
    //     getPath: d => d.path,
    //     getTimestamps: d => d.timestamps,
    //     getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
    //     opacity: 0.3,
    //     widthMinPixels: 2,
    //     rounded: true,
    //     trailLength,
    //     currentTime: this.state.time,

    //     shadowEnabled: false
    //   })

    return (
      <div>
        <div>
          <img src={BG} alt="Loading BG" className="backgroundimage"></img>
        </div>
        <div className="row" style={{ width: "100vw", overflowY: "hidden", paddingLeft: "40px" }}>
          <div className="col-md-9" style={{ height: "80vh", width: "75%", marginTop: "10px", position: "relative" }}>
            <DeckGL
              layers={this._renderLayers()}
              effects={theme.effects}
              initialViewState={INITIAL_VIEW_STATE}
              viewState={viewState}
              controller={true}
            >
              <MapView id="map" marginLeft="20px" controller={true}>
                <StaticMap
                  reuseMaps
                  mapStyle={mapStyle}
                  preventStyleDiffing={true}
                  mapboxApiAccessToken={MAPBOX_TOKEN}
                >
                  {
                    markers
                  }
                  {/* <Container 
                
              //  containerComponent={this.props.containerComponent}
              //  onChange={this._onStyleChange}
             /> */}
                </StaticMap>
              </MapView>
              {/* <ControlPanel containerComponent={this.props.containerComponent} onChange={this.onChange} route={this.state.route} pathD={this.state.routes}/> */}

            </DeckGL>
          </div>
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12">
                <div className="card" style={{ maxWidth: "700px" }}>
                  {/* <h5>Marker, Popup, NavigationControl and FullscreenControl </h5> */}
                  <div className="card-body">
                    <div>
                      <h5 className="form-group">{timeNow}</h5>
                    </div>
                    <div className="form-group">
                      {this.state.play ? <button type="button" className="btn btn-warning" onClick={this.playManip}>pause</button> : <button type="button" className="btn btn-success" onClick={this.playManip}>play</button>}
                    </div>
                    {this.state.routes.length > 0 ? <div>
                      <form>
                        <div className="form-group">
                          <select name="route" className="form-control" defaultValue={this.state.route} onChange={this.onChange}>
                            {this.state.routes.map(obj => {
                              return <option value={obj}>{obj}</option>
                            })}
                          </select>
                        </div>
                        {/* <div className="form-group">
                          <label htmlFor="showheatmap">Show Heat Map</label>
                          <input type="checkbox" name="showheatmap" onChange={this.onChange} value={this.state.showheatmap} />
                        </div> */}
                        {(this.state.route === "276C" || this.state.route === "401K") ? <div className="form-group">
                          <button type='button' className="btn btn-info" onClick={this.manipOptimized}>Optimize</button>
                        </div> : null}
                      </form>
                    </div> : null}

                    {/* <p>
           Data source:{' '}
           <a href="https:en.wikipedia.org/wiki/List_of_United_States_cities_by_population">
             Wikipedia
           </a>
         </p>
         <div className="source-link">
           <a
             href="https://github.com/uber/react-map-gl/tree/5.1-release/examples/controls"
             target="_new"
           >
             View Code ↗
           </a>
         </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "10px" }}>
              <div className="col-md-12" >
                {this.state.route.length > 0 ? <div>
                  <Card>
                    <CardBody style={{ maxHeight: "20rem", overflowY: "scroll" }}>
                      <table class="table" style={{ maxWidth: "700px", maxHeight: "20rem", overflowY: "auto" }}>
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">stop</th>
                          </tr>
                        </thead>
                        <tbody>
                          {RouteDet[this.state.route].map((obj, i) => {
                            return <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{obj['busstop']}</td>
                            </tr>
                          })}
                          {/* <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr> */}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </div> : null}
              </div>
            </div>

          </div>
        </div>
        {this.state.optimizedView ? <div className="row">
          <div className="col-md-6">
            <Map data={Path2} route={this.state.route} />
          </div>
          <div className="col-md-6">
            <Map data={Optimized} route={this.state.route} />
          </div>
        </div> : null}
      </div>
    );
  }
}
