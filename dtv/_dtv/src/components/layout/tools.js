export default class Tools {
  constructor(props) {
    Object.assign(this, props);
    this.el = typeof this.el == "string" ? document.getElementById(this.el) : this.el;
    this.el.innerHTML = `<div class="cmp"></div>`;
    this.list = this.el.firstChild;
    $(this.list).bind('click', (e) => {
      if(Dldh.Css.hasClass(e.target, "cmp-item")) {
        this.click(this.cache[e.target.getAttribute("data")]);
      }
    });
    /*Dldh.Drag({
      content: this.el,
      rowCls: "cmp-item",
      verify: (cur) => {
        return this.verify(cur);
      },
      mouseUp: (cur, target) => {
        this.mouseUp(cur, target, this.getDataBy(target));
      }
    });*/
  }
  getDataBy(row) {
    return this.cache[row.getAttribute('data')];
  }
  verify(cur) {}
  click(data) {}
  mouseUp(cur, target, data) {}
  load(data) {
    this.data = data || [];
    this.cache = {};
    let rs = [];
    for(let i = 0; i < this.data.length; i++) {
      this.cache[i] = this.data[i];
      rs.push(`<div class="cmp-item" data='${i}'>${this.cache[i]['name']}</div>`);
    }
    this.list.innerHTML = rs.join('');
  }
}