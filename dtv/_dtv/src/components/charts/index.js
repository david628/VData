export default class Chart {
  constructor(props) {
    //this.props = props || {};
    this.config = {};
    Object.assign(this, props);
  }
  resize() {}
  refresh() {}
  onchange(v) {}
}