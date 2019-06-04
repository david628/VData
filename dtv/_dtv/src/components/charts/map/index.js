import './index.less';
import Chart from '../';
export default class Text extends Chart {
  constructor(props) {
    super(props);
    this.width = 400;
    this.height = 200;
    this.init();
  }
  init() {
    this.refresh();
  }
  refresh(param) {
    if(!this.chart) {
      this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
      this.el.style.fontSize = "18px";
      this.el.style.color = "#fff";
      this.el.style.display = "flex";
      this.el.style.alignItems = "center";
      this.el.style.justifyContent = "center";
      this.el.innerHTML = "标题";
    }
  }
  resize() {
  }
}