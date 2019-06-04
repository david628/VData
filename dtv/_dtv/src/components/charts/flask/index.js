import './index.less';
import Chart from '../';
export default class Flask extends Chart {
  constructor(props) {
    super(props);
    this.from = 0;
    this.to = 0;
    this.speed = 1000;
    this.refreshInterval = 100;
    this.decimals = 0;
    this.split = ",";
    this.flask = () => {
      this.from += this.dvalue;
      this.count++;
      this.setContent(this.from);
      if (this.count >= this.flag) {
        clearInterval(this.interval);
        this.from = this.to;
      }
    }
    Object.assign(this, props);
    this.from = Number(this.from);
    this.to = Number(this.to);
    this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
    this.refresh();
  }
  formatter(num) {
    console.log(num);
    return num.toFixed(this.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, this.split);
  }
  setContent(content) {
    this.el.innerHTML = this.formatter(content);
  }
  load(v) {
    this.to = Number(v || 0);
    cmp.refresh();
  }
  refresh() {
    if(this.to == this.from) {
      return;
    }
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.flag = Math.ceil(this.speed / this.refreshInterval);
    this.dvalue = (this.to - this.from) / this.flag;
    this.count = 0;
    this.setContent(this.from);
    this.interval = setInterval(this.flask, this.refreshInterval);
  }
}
/*var cmp = new Flask({
  el: 'id-test',
  speed: 10000,
  //from: 3000,
  //to: 1000
});
function change(input) {
  cmp.load(input.value);
}*/