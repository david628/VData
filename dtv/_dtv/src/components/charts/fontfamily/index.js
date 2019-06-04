import Select from '../select';
export default class Fontfamily extends Select {
  constructor(props) {
    super(props);
    this.data = [{
      key: '微软雅黑',
      value: '微软雅黑'
    }, {
      key: '宋体',
      value: '宋体'
    }, {
      key: '黑体',
      value: '黑体'
    }, {
      key: '隶书',
      value: '隶书'
    }, {
      key: '幼圆',
      value: '幼圆'
    }, {
      key: 'tahoma',
      value: 'tahoma'
    }, {
      key: 'arial',
      value: 'arial'
    }, {
      key: 'sans-serif',
      value: 'sans-serif'
    }];
    this.refresh();
    if(this.value != undefined) {
      this.setValue(this.value);
    } else {
      this.setValue(this.data[0]['key']);
    }
  }
}
/*var cmp = new Select({
  el: 'id-test',
  data: [{
    key: 'a',
    value: 0
  }, {
    key: 'b',
    value: 1
  }, {
    key: 'c',
    value: 2
  }, {
    key: 'dbd',
    value: 3
  }, {
    key: 'e',
    value: 4
  }]
  //value: "hello"
});
cmp.refresh();*/