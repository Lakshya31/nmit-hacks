// import React, {PureComponent} from 'react';
// import {BaseControl} from 'react-map-gl';

// const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;
// const fullscreenControlStyle = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     padding: '10px'
//   };
// export default class ControlPanel extends BaseControl {
//   _render() {
//     const Container = this.props.containerComponent || defaultContainer;

//     return (
//         <div className="card" style={{maxWidth:"500px",position:'absolute',top:0,left:0,padding:'10px'}}>
//         <h5>Marker, Popup, NavigationControl and FullscreenControl </h5>
//         <p>
//           Map showing top 20 most populated cities of the United States. Click on a marker to learn
//           more.
//         </p>
//         <div>
//           <form>
//               <select name="routes" defaultValue={this.props.route}>
//               {this.props.pathD.map(obj=>{
//                 return <option value={obj}>{obj}</option>
//               })}
//               </select>
//             </form>
//             </div>
//         {/* <p>
//           Data source:{' '}
//           <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population">
//             Wikipedia
//           </a>
//         </p>
//         <div className="source-link">
//           <a
//             href="https://github.com/uber/react-map-gl/tree/5.1-release/examples/controls"
//             target="_new"
//           >
//             View Code ↗
//           </a>
//         </div> */}
//         </div>
      
//     );
//   }
// }
import React from 'react';
import PropTypes from 'prop-types';
import {BaseControl} from 'react-map-gl';

export default class ControlPanel extends BaseControl {
  // Instead of implementing render(), implement _render()
  _render() {
    const {viewport} = this._context;
    // draw something
    // _containerRef registers event listeners for map interactions
    return <div className="card" ref={this._containerRef} style={{maxWidth:"300px"}}>
      <div>
      <select>
        <option value="cards">hello</option>
      </select>
      <button type="button"> hello</button>
      </div>
      
    </div>
    ;
  }
}