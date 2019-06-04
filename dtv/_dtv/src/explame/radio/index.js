class Radio extends Chart {
  constructor(props) {
    super(props);
    this.template = `
      <div class="hwapp-title-inner">
        <a class="hwapp-title-content" href="javascript:;"></a>
      </div>
     `;
    this.fontFamily = "";
    this.fontSize = "22px";
    this.color = "#000";
    this.fontWeight = "weight";
    this.textAlign = "center";
    this.href = "";
    this.isSelft = false;
    this.value = "";
    Object.assign(this, props);
    this.el = document.getElementById(this.el);
    this.el.className = "hwapp-title";
    this.el.innerHTML = this.template;
    this.inner = this.el.querySelector(".hwapp-title-inner");
    this.content = this.el.querySelector(".hwapp-title-content");
    this.refresh();
  }
  refresh() {
    this.content.href = this.href || 'javascript:;';
    this.content.target = !this.isSelft ? '_blank' : '';
    this.content.title = this.href || 'javascript:;';
    this.content.innerHTML = this.value !== undefined ? this.value : '';
    this.content.style.fontSize = this.fontSize;
    this.content.style.color = this.color;
    this.content.style.fontWeight = this.fontWeight;
    if(this.textAlign == "left") {
      this.inner.style.justifyContent = "flex-start";
    } else if(this.textAlign == "center") {
      this.inner.style.justifyContent = "center";
    } else if(this.textAlign == "right") {
      this.inner.style.justifyContent = "flex-end";
    }
  }
}


var cmp = new Radio({
  el: 'id-test',
  value: "hello"
});
cmp.refresh();