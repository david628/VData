import './index.less';
import Chart from '../';
export default class Select extends Chart {
  constructor(props) {
    super(props);
    this.isExpand = false;
    this.displayField = "key";
    this.valueField = "value";
    this.name = "";
    this.template = `
      <div class="hwapp-select">
        <input type="hidden" class="hwapp-select-hidden">
        <input type="text" class="hwapp-select-input"/>
        <a class="hwapp-select-trigger" href="javascript:;"></a>
      </div>
     `;
    Object.assign(this, props);
    this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
    this.el.innerHTML = this.template;
    this.inner = this.el.querySelector(".hwapp-select");
    this.input = this.el.querySelector(".hwapp-select-input");
    this.hidden = this.el.querySelector(".hwapp-select-hidden");
    this.hidden.name = this.name;
    this.trigger = this.el.querySelector(".hwapp-select-trigger");
    this.list = document.createElement('div');
    this.list.className = 'hwapp-select-list';
    document.body.appendChild(this.list);
    this.input.readOnly = true;
    var self = this;
    var expand = function() {
      if(self.isExpand) {
        hide();
        self.isExpand = false;
        document.removeEventListener('mousedown', collapse, false);
      } else {
        show();
        self.isExpand = true;
        document.addEventListener('mousedown', collapse, false);
      }
    }
    var show = function() {
      self.show();
    }
    var hide = function(e) {
      self.hide();
      
    }
    var collapse = function(e) {
      if(!self.inner.contains(e.target) && !self.list.contains(e.target)) {
        self.hide();
        self.isExpand = false;
        document.removeEventListener('mousedown', collapse, false);
      }
    }
    var click = function(e) {
      let value = e.target.getAttribute("key"), preValue = self.value;
      if(value != preValue && self.hasClass(e.target, "hwapp-select-item")) {
        self.setValue(value);
        self.onchange(self.value);
      }
      expand();
    }
    //var change = function(e) {
      //self.change();
    //}
    //this.hidden.addEventListener('change', change, false);
    this.inner.addEventListener('click', expand, false);
    this.list.addEventListener('click', click, false);
    this.refresh();
  }
  getText(v) {
    for(let i = 0; i < this.data.length; i++) {
      if(this.data[i][this.valueField] == v) {
        return this.data[i][this.displayField];
      }
    }
    return "";
  }
  setValue(v) {
    this.hidden.value = v;
    this.input.value = this.getText(v);
    this.value = this.hidden.value;
    var rs = this.list.querySelectorAll(".hwapp-select-item");
    for(let i = 0; i < rs.length; i++) {
      if(rs[i].getAttribute("key") == v) {
        this.addClass(rs[i], "hwapp-select-item-active");
      } else {
        this.removeClass(rs[i], "hwapp-select-item-active");
      }
    }
  }
  show() {
    this.list.style.width = (this.inner.offsetWidth - 2) + 'px';
    var scroll = {
      left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
      top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
    /*var box = {
      width: this.inner.offsetWidth,
      height: this.inner.offsetHeight,
      left: this.inner.offsetLeft,
      top: this.inner.offsetTop
    };*/
    var _box = Dldh.Css.getBox(this.inner);
    var box = {
      width: _box.width,
      height: _box.height,
      left: _box.x,
      top: _box.y
    };
    var targetBox = {
      width: this.list.offsetWidth,
      height: this.list.offsetHeight
    };
    var left = box.left, top = box.top + box.height;
    if(box.left + targetBox.width > scroll.left + Math.max(document.documentElement.clientWidth, document.body.clientWidth)) {
      left = box.left - (targetBox.width - box.width);
    }
    if(box.top + box.height + targetBox.height > scroll.top + Math.max(document.documentElement.clientHeight, document.body.clientHeight)) {
      top = box.top - targetBox.height;
    }
    this.list.style.position = "absolute";
    this.list.style.left = left + "px";
    this.list.style.top = top + "px";
    this.addClass(this.list, "hwapp-select-list-show");
    this.addClass(this.inner, "hwapp-select-open");
  }
  hide() {
    this.removeClass(this.list, "hwapp-select-list-show");
    this.removeClass(this.inner, "hwapp-select-open");
  }
  hasClass(dom, cls) {
    return (" " + dom.className + " ").indexOf(" " + cls + " ") != -1;
  }
  addClass(dom, cls) {
    if(!this.hasClass(dom, cls)) {
      dom.className = dom.className + " " + cls;
    }
  }
  removeClass(dom, cls) {
    if(cls && dom.className) {
      if(this.hasClass(dom, cls)) {
        dom.className = dom.className.replace(new RegExp('(?:^|\\s+)' + cls + '(?:\\s+|$)', "g"), " ");
      }
    }
  }
  load(data) {
    this.data = data || [];
    let rs = [];
    for(let i = 0; i < this.data.length; i++) {
      rs.push(`<div class="hwapp-select-item" key="${this.data[i][this.valueField]}">${this.data[i][this.displayField]}</div>`);
    }
    this.list.innerHTML = rs.join('');
  }
  refresh() {
    this.load(this.data);
  }
}
/*var cmp = new Select({
  el: 'id-test',
  data: [{
    key: 'a',
    value: 0
  }, {
    key: 'b',
    value: 1
  }, {
    key: 'c',
    value: 2
  }, {
    key: 'dbd',
    value: 3
  }, {
    key: 'e',
    value: 4
  }]
  //value: "hello"
});
cmp.refresh();*/