import Control from './Control';
import Tools from './Tools';
import Workspace from './Workspace';
const layout = {
  init: function() {
    this.tools = new Tools({
      el: 'id-compList',
      verify: (cur) => {
        return this.workspace.el.contains(cur);
      },
      mouseUp: (cur, target, data) => {
        //this.layer.add(data)
        this.workspace.add(data);
      }
    });
    this.workspace = new Workspace({
      el: 'id-workspacerk',
      layer: 'id-layer'
    });
    this.addTools();
  },
  addTools: function() {
    this.tools.load([{
      type: 'bar',
      name: '柱状'
    }, {
      type: 'pie',
      name: '饼状'
    }, {
      type: 'line',
      name: '线状'
    }]);
  }
};
export default layout;