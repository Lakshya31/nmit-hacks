import {MapController} from 'react-map-gl';

export default class MyMapController extends MapController {

  _onPan(event) {
    return this.isFunctionKeyPressed(event) || event.rightButton ?
  //  Default implementation in MapController
  //  this._onPanRotate(event) : this._onPanMove(event);
      this._onPanMove(event) : this._onPanRotate(event);
  }
}