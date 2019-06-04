class Chart {
  static id() {
    if(Chart.___________idSeed === undefined) {
      Chart.___________idSeed = 0;
      return "charts-cmp-" + Chart.___________idSeed;
    }
    return "charts-cmp-" + ++Chart.___________idSeed;
  }
  constructor(props) {
    this.props = {};
    console.log('load...');
    Object.assign(this.props, props);
  }
  resize() {}
}