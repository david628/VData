import './index.less';
import Chart from '../';
export default class Flask extends Chart {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
    this.refresh();
  }
  load(data) {
    cmp.refresh();
  }
  refresh() {
    
  }
}
/*var cmp = new Flask({
  el: 'id-test',
  speed: 10000,
  //from: 3000,
  //to: 1000
});
cmp.load(input.value);*/
