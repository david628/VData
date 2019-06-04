class Border extends Chart {
  constructor(props) {
    super(props);
    this.fontFamily = "";
    this.fontSize = "22px";
    this.color = "#000";
    this.fontWeight = "weight";
    this.textAlign = "center";
    this.href = "www.baidu.com";
    this.isSelft = false;
    this.value = "";
    Object.assign(this, props);
    this.el = document.getElementById(this.el);
    this.el.className = "hwapp-text";
    this.refresh();
  }
  refresh() {
    this.el.innerHTML = `<div class="hwapp-text-inner"><a href="${this.href || 'javascript:;'}" target="${!this.isSelft ? '_blank' : ''}" title="${this.href}">${this.value}</a></div>`;
    let inner = this.el.firstChild;
    let a = inner.firstChild;
    a.style.fontSize = this.fontSize;
    a.style.color = this.color;
    a.style.fontWeight = this.fontWeight;
    if(this.textAlign == "left") {
      inner.style.justifyContent = "flex-start";
    } else if(this.textAlign == "center") {
      inner.style.justifyContent = "center";
    } else if(this.textAlign == "right") {
      inner.style.justifyContent = "flex-end";
    }
  }
}


var cmp = new Border({
  el: 'id-test',
  value: "hello"
});
cmp.refresh();