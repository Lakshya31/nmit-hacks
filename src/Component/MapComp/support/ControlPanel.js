import React from 'react';
import PropTypes from 'prop-types';
import {BaseControl} from 'react-map-gl';

export default class MyCustomOverlay extends BaseControl {
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