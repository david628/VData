class Color extends Chart {
  constructor(props) {
    super(props);
    this.template = `
      <div class="hwapp-colorpicker">
        <div class="hwapp-colorpicker-color"></div>
      </div>
     `;
    
    Object.assign(this, props);
    this.el = document.getElementById(this.el);
    this.el.innerHTML = this.template;
    this.refresh();
  }
  refresh() {
    
  }
}


var cmp = new Color({
  el: 'id-test'
});
cmp.refresh();