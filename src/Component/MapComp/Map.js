
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Popup, NavigationControl, FullscreenControl, ScaleControl, Marker} from 'react-map-gl';

import ControlPanel from './support/ControlPanel';
import Pins from './support/Pin';
import CityInfo from './support/CityInfo';
import CityPin from './support/Pin';
import StopPin from "../Path/subcompoenents/StopPin"
// import CITIES from '../../.data/cities.json';

const TOKEN = ''; // Set your mapbox token here

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

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        viewport: {
            width: 500, 
            height: 300,
            latitude: 12.9716,
            longitude: 77.5946,
            zoom: 13
          },
      popupInfo: null
    };
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _onClickMarker = city => {
    this.setState({popupInfo: city});
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

  render() {
    const {viewport} = this.state;
    const points = this.props.stops;
    let view = points.map((obj,i)=>{
        return <Marker key={i} latitude={parseFloat(obj.latitude)} longitude={parseFloat(obj.longitude)}>
            <StopPin size={20} />
            </Marker>
    })
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={"pk.eyJ1IjoibmFtYmlhcnNpZGhhcnRoIiwiYSI6ImNrM2VsdjBsdTExOXAzbnVpcmhwanMyN3kifQ.QSt6sbifkuzfUdSz6YLoww"}
        >

        {/* <Pins data={points} onClick={this._onClickMarker} /> */}

        {/* {this._renderPopup()}

        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div> */}
    {view}
        {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
      </MapGL>
    );
  }
}