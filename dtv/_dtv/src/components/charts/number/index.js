import './index.less';
import Chart from '../';
export default class Number extends Chart {
  constructor(props) {
    super(props);
    this.template = `
      <div class="hwapp-number">
        <span class="hwapp-number-oper-wrap">
          <span class="hwapp-number-oper hwapp-number-add">+</span>
          <span class="hwapp-number-oper hwapp-number-reduce">-</span>
        </span>
        <input class="hwapp-number-hidden" type="hidden"/>
        <input class="hwapp-number-input" type="text"/>
      </div>
     `;
    this.value = 0;
    this.min = -Infinity;
    this.max = Infinity;
    this.precision = 2;
    this.step = 1;
    this.unit = 'px';
    this.name = '';
    Object.assign(this, props);
    this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
    this.el.innerHTML = this.template;
    this.inner = this.el.querySelector(".hwapp-number");
    this.input = this.el.querySelector(".hwapp-number-input");
    this.hidden = this.el.querySelector(".hwapp-number-hidden");
    this.oper = this.el.querySelector(".hwapp-number-oper-wrap");
    this.addBtn = this.el.querySelector(".hwapp-number-add");
    this.reduceBtn = this.el.querySelector(".hwapp-number-reduce");
    this.hidden.name = this.name;
    this.input.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if(e.keyCode === 13) {
        this.input.blur();
      }
    }, false);
    var self = this;
    var changeEvent = document.createEvent('HTMLEvents');
    changeEvent.initEvent('change', true, true);
    var distance = 0;
    var onMouseDownValue = 0;
    var pointer = [0, 0];
    var prevPointer = [0, 0];
    var onMouseDown = function(e) {
      e.preventDefault();
      distance = 0;
      self.isMove = true;
      onMouseDownValue = self.value;
      prevPointer = [e.clientX, e.clientY];
      document.addEventListener('mousemove', onMouseMove, false);
      document.addEventListener('mouseup', onMouseUp, false);
    }
    var onMouseMove = function(e) {
      var currentValue = self.value;
      pointer = [e.clientX, e.clientY];
      distance += (pointer[0] - prevPointer[0]) - (pointer[1] - prevPointer[1]);
      var value = onMouseDownValue + (distance / (e.shiftKey ? 5 : 50)) * self.step;
      value = Math.min(self.max, Math.max(self.min, value));
      if(currentValue !== value) {
        self.setValue(value);
        self.isMove = true;
        //self.input.dispatchEvent(changeEvent);
      } else {
        self.isMove = false;
      }
      prevPointer = [e.clientX, e.clientY];
    }
    var onMouseUp = function(e) {
      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mouseup', onMouseUp, false);
      if(self.isMove && onMouseDownValue != self.value) {
        self.onchange(self.value);
      }
    }
    var onChange = function(e) {
      self.setValue(self.input.value);
      self.onchange(self.value);
    }
    var onFocus = function(e) {
      self.input.style.backgroundColor = '';
      self.input.style.cursor = '';
    }
    var onBlur = function(e) {
      self.input.style.backgroundColor = 'transparent';
      self.input.style.cursor = 'col-resize';
    }
    var onClick = function() {
      self.input.focus();
    }
    var onAdd = function() {
      self.setValue(self.value + self.step);
      self.onchange(self.value);
    }
    var onReduce = function() {
      self.setValue(self.value - self.step);
      self.onchange(self.value);
    }
    onBlur();
    this.inner.addEventListener('mousedown', onMouseDown, false);
    this.input.addEventListener('click', onClick, false);
    this.addBtn.addEventListener('click', onAdd, false);
    this.reduceBtn.addEventListener('click', onReduce, false);
    this.input.addEventListener('change', onChange, false);
    this.input.addEventListener('focus', onFocus, false);
    this.input.addEventListener('blur', onBlur, false);
    this.refresh();
  }
  trim(v) {
    return v.toString().replace(/(^\s*)|(\s*$)/g, "");
  }
  setValue(value) {
    value = this.trim(value);
    if(value === "") {
      this.input.value = this.value + ' ' + this.unit;
    } else if(value !== undefined) {
      value = parseFloat(value, 10);
      if(value < this.min) {
        value = this.min;
      }
      if(value > this.max) {
        value = this.max;
      }
      this.value = value;
      this.input.value = value.toFixed(this.precision);
      if(this.unit !== '') {
        this.input.value += ' ' + this.unit;
      }
    }
    this.hidden.value = this.value;
    return this;
  }
  getValue() {
    return this.value;
  }
  refresh() {
    this.setValue(this.value);
  }
}


/*var cmp = new Number({
  el: 'id-test',
  value: 100,
  step: 0.01
});
cmp.refresh();*/