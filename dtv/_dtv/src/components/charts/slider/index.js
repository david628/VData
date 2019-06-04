import './index.less';
import Chart from '../';
export default class Slider extends Chart {
  constructor(props) {
    super(props);
    /*this.template = `
      <div class="hwapp-slider">
        <input type="hidden" class="hwapp-slider-input">
        <span class="hwapp-slider-bar">
          <span class="hwapp-slider-handle" style="left: 53px;"></span>
          <span class="hwapp-slider-min">0</span>
          <span class="hwapp-slider-max">1</span>
          <span class="hwapp-slider-quantity" style="width: 53px;"></span>
        </span>
      </div>
      <div>
        <input class="range" type="range" min="0" max="360" step="0.5" value="90"/>
      </div>
     `;*/
    this.template = `
      <div class="hwapp-slider">
        <div class="hwapp-slider-thumb">
          <input class="range" type="range"/>
        </div>
        <div class="hwapp-slider-content">
          <ul>
            <li>
              <div class="hwapp-slider-min"></div>
            </li>
            <li>
              <div class="hwapp-slider-value"></div>
            </li>
            <li>
              <div class="hwapp-slider-max"></div> 
            </li>
          </ul>
        </div>
      </div>
     `;
    this.value = 0;
    this.min = 0;
    this.max = 100;
    this.step = 1;
    this.name = "";
    Object.assign(this, props);
    this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
    this.el.innerHTML = this.template;
    this.inner = this.el.querySelector(".hwapp-slider");
    this.input = this.el.querySelector(".range");
    this.minText = this.el.querySelector(".hwapp-slider-min");
    this.valueText = this.el.querySelector(".hwapp-slider-value");
    this.maxText = this.el.querySelector(".hwapp-slider-max");
    this.input.name = this.name;
    this.input.oninput = () => {
      this.setValue(this.input.value);
    }
    this.input.onchange = () => {
      //this.setValue(this.input.value);
      this.onchange(this.value);  
    }
    this.refresh();
  }
  setStep(v) {
    this.step = v || this.step;
    this.input.step = this.step;
  }
  setMin(v) {
    this.min = v || this.min;
    this.minText.innerHTML = this.input.min = this.min;
  }
  setMax(v) {
    this.max = v || this.max;
    this.maxText.innerHTML = this.input.max = this.max;
  }
  setValue(v) {
    this.value = v || this.value;
    this.valueText.innerHTML = this.input.value = this.value;
  }
  refresh() {
    this.setStep();
    this.setMin();
    this.setMax();
    this.setValue();
  }
}
/*var cmp = new Slider({
  el: 'id-test'
  //value: "hello"
});
cmp.refresh();*/