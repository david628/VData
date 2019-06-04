const factory = function(props, node, json) {
  let id = Dldh.chartsId(), layer = document.createElement('div');
  layer.className = "layer-box";
  layer.innerHTML = `<div id="${id}" class="charts-el"></div>`;
  node.appendChild(layer);
  if(!props['attr']) {
    props['attr'] = {
      w: 500,
      h: 400
    };
  }
  layer.style.width = props['attr']['w'] + 'px';
  layer.style.height = props['attr']['h'] + 'px';
  if(props['attr']['x'] && props['attr']['y']) {
    layer.style.top = props['attr']['y'] + 'px';
    layer.style.left = props['attr']['x'] + 'px';
  } else {
    Dldh.Css.center(layer, node);
    props['attr']['y'] = parseInt(layer.style.top, 10);
    props['attr']['x'] = parseInt(layer.style.left, 10);
  }
  if(props['attr']['zIndex']) {
    layer.style.zIndex = props['attr']['zIndex'];
  } else {

  }
  //props.el = id;
  //console.log(props);
  let chart, type = props['com'];
  let config = Object.assign({}, json, props['config']);
  try {
    chart = new (require(`./charts/${type.toLocaleLowerCase()}`).default)({
      el: id,
      config: config
    });
  } catch(err) {
    console.log(err);
    return {
      layer,
      chart
    };
  } 
  return {
    layer,
    chart
  };
}
const resolve = function(jsondata) {
  let coms = [];
  if(jsondata['config'] && jsondata['config']['scenes']) {
    if(jsondata['config']['scenes'].length) {
      if(jsondata['config']['scenes'][0]['layers'] && jsondata['config']['scenes'][0]['layers'].length) {
        coms = jsondata['config']['scenes'][0]['layers'][0]['coms'] || [];
      }
    }
  }
  return coms;
}
const getDataByGUI = function(guicontent) {
  if(!guicontent) {
    return {
      styledata: {},
      jsondata: {},
      eventdata: {}
    };
  }
  let styledata_dom = guicontent.querySelector('.hwvdata-setting-styledata'),
  jsondata_dom = guicontent.querySelector('.hwvdata-setting-jsondata'),
  eventdata_dom = guicontent.querySelector('.hwvdata-setting-eventdata'),
  styledata_inputs = styledata_dom.querySelectorAll('input'),
  jsondata_inputs = jsondata_dom.querySelectorAll('input'),
  eventdata_inputs = eventdata_dom.querySelectorAll('input'),
  styledata = {},
  jsondata = {},
  eventdata = {};
  for(let i = 0; i < styledata_inputs.length; i++) {
    if(styledata_inputs[i]['name'] != undefined && styledata_inputs[i]['name'] != "") {
      styledata[styledata_inputs[i]['name']] = styledata_inputs[i]['value'];
    }
  }
  for(let i = 0; i < jsondata_inputs.length; i++) {
    if(jsondata_inputs[i]['name'] != undefined && jsondata_inputs[i]['name'] != "") {
      styledata[jsondata_inputs[i]['name']] = jsondata_inputs[i]['value'];
    }
  }
  for(let i = 0; i < eventdata_inputs.length; i++) {
    if(eventdata_inputs[i]['name'] != undefined && eventdata_inputs[i]['name'] != "") {
      styledata[eventdata_inputs[i]['name']] = eventdata_inputs[i]['value'];
    }
  }
  return {
    styledata,
    jsondata,
    eventdata
  };
}
const childrenGUI = function(node, children) {
  let child, content, cmp, pcmp;
  for(let i = 0; i < children.length; i++) {
    child = $(`<div class="hwvdata-form-group">
      <div class="hwvdata-form-item">
        ${children[i]['isExpand'] ? '<input class="hwvdata-form-chk" type="checkbox"/>' : ''}
        <div class="hwvdata-form-label ${children[i]['children'] && children[i]['children'].length ? 'hwvdata-form-label hwvdata-form-row' : ''}">
          ${children[i]['type'] ? children[i]['label'] + '<span class="hwvdata-form-cmp"></span>' : children[i]['label']}
        </div>
        <div class="hwvdata-form-content"></div>
      </div>
    </div>`);
    node.append(child);
    content = child.find('.hwvdata-form-content');
    if(children[i]['children'] && children[i]['children'].length) {
      child.find('.hwvdata-form-cmp').data('data', children[i]);
      childrenGUI(content, children[i]['children']);
    } else {
      cmp = $(`<span class="hwvdata-form-cmp"></span>`);
      content.append(cmp);
      cmp.data('data', children[i]);
    }
  }
}
const createGUI = function(props, fn) {
  let guicontent = $(`<div class="hwvdata-setting-contain"><form>
    <input class="hwvdata-setting-chk" type="radio" name="setting_tab" checked/>
    <span class="hwvdata-setting-col">样式</span>
    <div class="hwvdata-setting-dropdown hwvdata-setting-styledata"></div>
    <div class="hwvdata-setting-content">
      <input class="hwvdata-setting-chk" type="radio" name="setting_tab" style="left: 33.333333%;"/>
      <span class="hwvdata-setting-col">数据</span>
      <div class="hwvdata-setting-dropdown hwvdata-setting-jsondata"></div>
    </div>
    <div class="hwvdata-setting-content">
      <input class="hwvdata-setting-chk" type="radio" name="setting_tab" style="left: 66.666666%;"/>
      <span class="hwvdata-setting-col">交互</span>
      <div class="hwvdata-setting-dropdown hwvdata-setting-eventdata"></div>
    </div>
  </form></div>`);
  guicontent.appendTo($('#id-hwvdata-setting'));
  guicontent = guicontent.get(0);
  let styledata_dom = guicontent.querySelector('.hwvdata-setting-styledata'),
  jsondata_dom = guicontent.querySelector('.hwvdata-setting-jsondata'),
  eventdata_dom = guicontent.querySelector('.hwvdata-setting-eventdata'), GUI;
  try {
    GUI = require(`./charts/${props['com'].toLocaleLowerCase()}/gui`).default;
  } catch(err) {
    console.log(err);
  }
  if(!GUI) {
    return;
  }
  let html = [], style = GUI['style'], data = GUI['data'], event = GUI['event'];
  childrenGUI($(`<div class="hwvdata-form"></div>`).appendTo($(styledata_dom)), style);
  let cmps = styledata_dom.querySelectorAll('.hwvdata-form-cmp'), _cmps;
  for(let i = 0; i < cmps.length; i++) {
    _cmps = $(cmps[i]);
    let props = _cmps.data('data');
    if(props && props['type'] !== undefined) {
      props.el = cmps[i];
      new (require(`./charts/${props['type'].toLocaleLowerCase()}`).default)(props).onchange = function() {
        fn && fn(guicontent, getDataByGUI(guicontent));
      };
    }
    _cmps.data('data', null);
  }
  let first = styledata_dom.querySelector('.hwvdata-form-chk');
  if(first) {
    first.checked = true;
  }
  return guicontent;
}
export {
  factory,
  resolve,
  createGUI,
  getDataByGUI
};