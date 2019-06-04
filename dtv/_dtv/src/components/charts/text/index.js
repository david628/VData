import './index.less';
import Chart from '../';
export default class Text extends Chart {
  constructor(props) {
    super(props);
    this.template = `
      <div class="hwapp-text-inner">
        <div class="hwapp-text-content"></div>
      </div>
     `;
    this.fontFamily = "";
    this.fontSize = "12px";
    this.color = "#000";
    this.fontWeight = "weight";
    this.textAlign = "left";
    this.lineHeight = "36px";
    this.textIndent = "37px";
    this.value = "";
    this.isMove = false;
    Object.assign(this, props);
    this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
    this.el.className = "hwapp-text";
    this.el.innerHTML = this.template;
    this.inner = this.el.querySelector(".hwapp-text-inner");
    this.content = this.el.querySelector(".hwapp-text-content");
    if(this.isMove) {
      this.initScroll();
    }
    this.refresh();
  }
  refresh() {
    this.content.title = this.href || '';
    this.content.innerHTML = this.value !== undefined ? this.value : '';
    this.content.style.fontSize = this.fontSize;
    this.content.style.color = this.color;
    this.content.style.fontWeight = this.fontWeight;
    this.content.style.textIndent = this.textIndent;
    this.content.style.lineHeight = this.lineHeight;
    this.content.style.textAlign = this.textAlign;
  }
  initScroll() {
    this.timeout = 100;
    this.move = true;
    this.el.onmouseover = () => {
      this.move = false;
    }
    this.el.onmouseout = () => {
      this.move = true
    }
    this.scroll = () => {
      if(!this.move) {
        return;
      }
      if(this.el.scrollHeight == this.el.scrollTop + this.el.offsetHeight) {
        this.el.scrollTop = 0;
      } else {
        this.el.scrollTop += 1;
      }
    }
    if(this.setInterval) {
      clearTimeout(this.setInterval);
    }
    this.setInterval = setInterval(this.scroll, this.timeout);
  }
}


/*var cmp = new Text({
  el: 'id-test',
  value: "我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据我的数据"
});
cmp.refresh();*/