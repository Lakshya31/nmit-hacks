import React, { Component } from 'react'
import {StaticMap,Marker} from 'react-map-gl';
import {PhongMaterial} from '@luma.gl/core';
import {AmbientLight,MapView, PointLight, LightingEffect} from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import {PolygonLayer} from '@deck.gl/layers';
import {TripsLayer,} from '@deck.gl/geo-layers';
import StopPin from "../Path/subcompoenents/StopPin"
const MAPBOX_TOKEN = "pk.eyJ1IjoibmFtYmlhcnNpZGhhcnRoIiwiYSI6ImNrM2VsdjBsdTExOXAzbnVpcmhwanMyN3kifQ.QSt6sbifkuzfUdSz6YLoww"; // eslint-disable-line

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0
  });
  
  const pointLight = new PointLight({
    color: [255, 255, 255],
    intensity: 2.0,
    position: [-74.05, 40.7, 8000]
  });
  
  const lightingEffect = new LightingEffect({ambientLight, pointLight});
  
  const material = new PhongMaterial({
    ambient: 0.1,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [60, 64, 70]
  });
  
  const DEFAULT_THEME = {
    buildingColor: [74, 80, 87],
    trailColor0: [253, 128, 150],
    trailColor1: [23, 184, 190],
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
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
          time: 0,
          route:"",
          routes:[],
          selected:null,
          play:true,
          showheatmap:false,
          optimizedView:false
        };
        // this.onChange = this.onChange.bind(this)
        this._renderLayers=this._renderLayers.bind(this)
        this._renderCityMarker=this._renderCityMarker.bind(this)
        
      }
      componentWillMount(){
        this.setState({route:this.props.route})
      }
      componentDidMount() {
        // this.setState({route:this.props.route})
        this._animate();
                // console.log(path1)
                // fs.writeFileSync("path2.json",JSON.stringify(path1)).
        }

    _animate() {
        const {
          loopLength = 1800, // unit corresponds to the timestamp in source data
          animationSpeed = 5 // unit time per second
        } = this.props;
        const timestamp = Date.now() / 1000;
        const loopTime = loopLength / animationSpeed;
        
        this.setState({
          time: ((timestamp % loopTime) / loopTime) * loopLength
        });
      
        this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
      }
     

      _renderCityMarker = (city, index) => {
        // console.log()
        return (
          <Marker key={`marker-${index}`} longitude={parseFloat(city[0])} latitude={parseFloat(city[1])}>
            <StopPin size={20}  />
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
    componentWillUnmount() {
        if (this._animationFrame) {
          window.cancelAnimationFrame(this._animationFrame);
        }
      }
      playManip(){
        this.setState({play:!this.state.play});
      }
      _renderLayers() {
        const {
          trailLength = 15,
          theme = DEFAULT_THEME,
           intensity = 1, 
          threshold = 0.03, 
          radiusPixels = 30
        } = this.props;
        let temp_path
          temp_path=[]
          temp_path=this.props.data.filter(obj=>{
          return obj['vendor']===this.state.route
          })
        //   console.log(temp_path,this.state.route)
        //   console.log(temp_path)
          if(!this.state.selected){
            this.setState({selected:temp_path})
          }else{
          if(JSON.stringify(this.state.selected)!==JSON.stringify(temp_path)){
            this.setState({selected:temp_path})
          }
        }
       
        
        return [
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
          })
        ];
    }
    
    render() {
        let markers=null
        let timeNow=this.secondsToHms(this.state.time*86399/1800)
        console.log("actual",timeNow)
        if(this.state.selected){
            console.log(this.state.selected)
          markers=this.state.selected[0]['path'].map(this._renderCityMarker)
        }
        let styles='mapbox://styles/mapbox/dark-v9'
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

        return (
            <div>
                <DeckGL
            layers={this._renderLayers()}
            effects={theme.effects}
            initialViewState={INITIAL_VIEW_STATE}
            viewState={viewState}
            controller={true}
          >
            <MapView id="map" width="80%" controller={true}>
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
        )
    }
}
