import './index.less';
import Chart from '../';
import THREEx from './THREEx';
import LINE_DATA from './data';
import HOT_DATA from './hotData';
export default class Earth extends Chart {
  constructor(props) {
    super(props);
    Object.assign(this.props, props);
    this.gobal = new THREEx.Gobal(this.props);
    this.refresh();
  }
  refresh(param) {
    if(!this.gobal.animate) {
      this.gobal.animate = () => {
        this.gobal.render();
      }
      this.gobal.load();
    }
    this.gobal.loadFlightLine(LINE_DATA);     
    this.gobal.loadHotspot(HOT_DATA);
  }
  resize() {
    var w = this.gobal.renderer.domElement.parentNode.offsetWidth || window.innerWidth;
    var h = this.gobal.renderer.domElement.parentNode.offsetHeight || window.innerHeight;
    this.gobal.renderer.setSize(w, h);
    this.gobal.camera.aspect = w / h;
    this.gobal.camera.updateProjectionMatrix();
  }
}