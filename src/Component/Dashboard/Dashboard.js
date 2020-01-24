import React, { Component } from 'react'
import ReactMapGL,{Marker, Popup , Source,Layer,NavigationControl, FullscreenControl} from 'react-map-gl';
import {withRouter,Link} from "react-router-dom"
import CityPin from "./support/Pin"
import ControlPanel from './support/ControlPanel';
import CityInfo from './support/CityInfo';
import BSTD from "./routes.2018"
import Path from "./path"
import Points from "./pointdata.json"
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';
// import Controller from "./support/Controller"

const fullscreenControlStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  };
  
const navStyle = {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'
  };

  const style1 = {
    width: '20px',
    height: '20px',
    color: '#fff',
    background: '#1978c8',
    borderRadius: '20px',
    textAlign: 'center'
  };

  const ClusterMarker = ({ longitude, latitude, pointCount }) => (
    <Marker longitude={longitude} latitude={latitude}>
      <div style={{ ...style1, background: '#f28a25' }}>{pointCount}</div>
    </Marker>
  );

  const pointLayer = {
    type: 'circle',
    paint: {
      'circle-radius': 3,
      'circle-color': '#007cbf'
    }
  };
  const pinStyle = {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none'
  };
class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            viewport: {
                width: "100%", 
                height: 700,
                latitude: 12.9716,
                longitude: 77.5946,
                zoom: 9
              },
              maptype:"btsm"
        }
        this.coordinateClick = this.coordinateClick.bind(this)
        this.routesShow = this.routesShow.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    coordinateClick(e){
        console.log(e)
    }
    onChange(e){
      this.setState({[e.target.name]:e.target.value})
    }
  _renderCityMarker = (city, index) => {
    // console.log(city)
    return (
      <Marker key={`marker-${index}`} longitude={parseFloat(city.latlons[1])} latitude={parseFloat(city.latlons[0])}>
        <CityPin 
        // onClick={() => this.setState({popupInfo: city})} 
        />
      </Marker>
    );
  };

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  routesShow(){
    console.log(Path)

    this.props.history.push('/paths')

  }
    render() {
      // console.log(BSTD)
      let markers
      if(this.state.maptype==="stoploc"){
        console.log("stoploc called")
        markers=Points.map(this._renderCityMarker)
        
      
      }
      else if(this.state.maptype==="btsm"){
        markers=<Source type="geojson" data={BSTD}>
            <Layer {...pointLayer} />
          </Source>
      }

        return (
            <div>
              <div>
                {/* <button type="button" onclick={this.routesShow}>routes boy</button> */}
                <Link to='/path'>routes</Link>
              </div>
              <div className="row">
                <div className="col-md-9">
                <ReactMapGL
        {...this.state.viewport}
        // mapStyle={styleSheet}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={"pk.eyJ1IjoibmFtYmlhcnNpZGhhcnRoIiwiYSI6ImNrM2VsdjBsdTExOXAzbnVpcmhwanMyN3kifQ.QSt6sbifkuzfUdSz6YLoww"}
        // controller={ControlPanel}
      >
         


         {/* {CITIES.map(this._renderCityMarker)}

        {this._renderPopup()}

        <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>

        <ControlPanel containerComponent={this.props.containerComponent} /> */}
{/* 
        <Source type="geojson" data={data}>
            <Layer {...dataLayer} />
        </Source> */}


        {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
          {markers}
          <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
          
        </ReactMapGL>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <select name="maptype" onChange={this.onChange} value={this.state.maptype}>
                          <option value="btsm"> BTSM</option>
                            {/* <option value="stoploc">Stops location</option> */}
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
        </div>
            </div>
        )
    }
}

export default withRouter(Dashboard)