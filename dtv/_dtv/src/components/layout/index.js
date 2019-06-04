import Tools from './Tools';
import Workspace from './Workspace';
import {resolve} from '../factory';
import jsondata from '../../lib/data';
const layout = {
  init: function() {
    this.tools = new Tools({
      el: 'id-compList',
      verify: (cur) => {
        return this.workspace.el.contains(cur);
      },
      click: (ds) => {
        this.workspace.add({
          com_id: ds['name'],
          alias: ds['name'],
          attr: null,
          children: null,
          com: ds['type'],
          config: null,
          data: null,
          parent: null,
          version: ''
        });
      }/*,
      mouseUp: (cur, target, data) => {      
        //this.layer.add(data)
        let layer = this.workspace.add(data);
        Dldh.setData(layer.firstChild, factory({
          el: layer.firstChild.id,
          type: data['type']
        }));
      }*/
    });
    this.workspace = new Workspace({
      el: 'id-workspacerk',
      layer: 'id-layer'
    });
    this.addTools();
    /*let coms = this.req_getJsondata();
    for(let i = 0; i < coms.length; i++) {
      this.workspace.add(coms[i]);
    }*/
    /*this.workspace.add({
      type: 'earth',
      name: '地球'
    });*/
  },
  addTools: function() {
    this.tools.load([{
      type: 'image',
      name: '图片'
    }, {
      type: 'text',
      name: '文本'
    }, {
      type: 'bar',
      name: '柱状'
    }, {
      type: 'pie',
      name: '饼状'
    }, {
      type: 'line',
      name: '线状'
    }, {
      type: 'map',
      name: '地图'
    }, {
      type: 'earth',
      name: '地球'
    }, {
      type: '',
      name: '数字翻牌'
    }, {
      type: 'table',
      name: '列表'
    }, {
      type: 'border',
      name: '边框'
    }]);
  },
  req_getJsondata(param) {
    return resolve(jsondata);
  }
};
export default layout;