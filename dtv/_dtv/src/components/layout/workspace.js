import {factory,getDataByGUI,createGUI} from '../factory';
export default class Workspace {
  constructor(props) {
    Object.assign(this, props);
    this.el = typeof this.el == "string" ? document.getElementById(this.el) : this.el;
    this.el.innerHTML = `<div class="hwvdata-view"></div>`;
    this.list = this.el.firstChild;
    this.layer = typeof this.layer == "string" ? document.getElementById(this.layer) : this.layer;
    this.layer.innerHTML = `<div class="layer"></div>`;
    this.layerList = this.layer.firstChild;
    Dldh.Drag({
      content: this.layer,
      rowCls: "layer-item",
      afterMouseUp: function(cur, target, isChecked) {
        //void
      }
    });
  }
  addLayer(item) {
    let layerShort = document.createElement('div');
    layerShort.className = "layer-item";
    layerShort.innerHTML = `<input class="layer-item-check" type="checkbox"/>${item["alias"]}`;
    this.layerList.appendChild(layerShort);
    return layerShort;
  }
  initDragResize(layerBox) {
    var drag = document.createElement("div");
    drag.className = "cls-dragResize-dragwrap";
    drag.style.width = layerBox.offsetWidth + "px";
    drag.style.height = layerBox.offsetHeight + "px";
    drag.style.top = parseInt(layerBox.style.top, 10) + "px";
    drag.style.left = parseInt(layerBox.style.left, 10) + "px";
    layerBox.parentNode.appendChild(drag);
    this.drag = this.el.querySelector(".cls-dragResize-drag");
    this.dragDrop = new Dldh.DragDrop(layerBox, {
      constrain : false,
      proxy : false,
      onMouseMove: function() {
        this.handle.style.top = parseInt(layerBox.style.top, 10) + "px";
        this.handle.style.left = parseInt(layerBox.style.left, 10) + "px";
      },
      handle : drag
    });
    this.resizable = new Dldh.Resizable(drag, {
      handles: "all",
      rel: layerBox,
      onMouseMove: function(box) {
        this.rel.style.top = box.top + "px";
        this.rel.style.left = box.left + "px";
        this.rel.style.width = box.width + "px";
        this.rel.style.height = box.height + "px";
      },
      onMouseUp: function() {
        let chart = Dldh.getData(this.rel.firstChild);
        if(chart && chart.resize) {
          chart.resize();
        }
      }
    });
    return drag;
  }
  singleSelect(layer) {
    let lb = this.getLayerBoxs();
    for(let i = 0; i < lb.length; i++) {
      if(lb[i] == layer) {
        this.select(lb[i], true);
      } else {
        this.select(lb[i], false);
      }
    } 
  }
  isSelected(layer) {
    return Dldh.getData(layer).drag.style.display !== "none";
  }
  select(layer, is) {
    let layerData = Dldh.getData(layer);
    if(is) {
      layerData.drag.style.display = "block";
      $(layerData.layerShort).addClass("layer-item-over");
      $(layerData.gui).addClass("hwvdata-setting-over");
    } else {
      layerData.drag.style.display = "none";
      $(layerData.layerShort).removeClass("layer-item-over");
      $(layerData.gui).removeClass("hwvdata-setting-over");
    }
  }
  clearAllSelected() {
    let lb = this.getLayerBoxs();
    for(let i = 0; i < lb.length; i++) {
      this.select(lb[i], false);
    }
  }
  getLayerBoxs() {
    return this.list.querySelectorAll(".layer-box");
  }
  _onClick(e) {
    var opt = e.data;
    if(opt && opt.scope) {
      opt.scope.onClick(e, opt.layer);
    }
    return false;
  }
  onClick(e, layer) {
    if(this.isSelected(layer)) {
      return;
    } else {
      this.singleSelect(layer);
    }
  }
  add(item, props) {
    let gui = createGUI(item, (g, ds) => {
      let ch = Dldh.getData(g);
      Object.assign(ch['config'], ds);
      ch.refresh();
    });
    let {layer, chart} = factory(item, this.list, getDataByGUI(gui));
    let drag = this.initDragResize(layer);
    let layerShort = this.addLayer(item);
    Dldh.setData(layer.firstChild, chart);
    Dldh.setData(gui, chart);
    Dldh.setData(layer, {
      layerShort,
      drag,
      data: item,
      gui
    });
    this.singleSelect(layer, true);
    $(layerShort).bind("click", {scope: this, layer: layer, gui: gui}, this._onClick);
    $(drag).bind("click", {scope: this, layer: layer, gui: gui}, this._onClick);
    $(layer).bind("click", {scope: this, layer: layer, gui: gui}, this._onClick);
  }
}