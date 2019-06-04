import './index.less';
import Chart from '../';
export default class Color extends Chart {
  constructor(props) {
    super(props);
    let id = Dldh.id();
    this.template = `
      <div class="hwapp-checkbox">
        <input id="${id}" class="hwapp-checkbox-input" type="checkbox"/>
        <label for="${id}" class="hwapp-checkbox-bar"></label>
        <label for="${id}" class="hwapp-checkbox-label"></label>
      </div>
     `;
    this.name = "";
    this.value = false;
    this.label = "";
    Object.assign(this, props);
    this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
    this.el.innerHTML = this.template;
    this.inner = this.el.querySelector(".hwapp-checkbox");
    this.input = this.el.querySelector(".hwapp-checkbox-input");
    this.labelText = this.el.querySelector(".hwapp-checkbox-label");
    this.input.name = this.name;
    this.onchange = () => {
      this.setValue(this.input.checked);
      this.onchange(this.value);
    }
    this.refresh();
  }
  setValue(v) {
    this.input.value = this.value = v;
  }
  refresh() {
    this.labelText.innerHTML = this.label;
    this.setValue(this.value);
    this.input.checked = this.value;
  }
}
/*var cmp = new Checkbox({
  el: 'id-test',
  label: "显示",
  value: true
});*/