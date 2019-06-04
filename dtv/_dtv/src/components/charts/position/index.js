import Select from '../select';
export default class Position extends Select {
  constructor(props) {
    super(props);
    this.data = [{
      key: 'top',
      value: 'top'
    }, {
      key: 'right',
      value: 'right'
    }, {
      key: 'inside',
      value: 'inside'
    }, {
      key: 'left',
      value: 'left'
    }, {
      key: 'bottom',
      value: 'bottom'
    }, {
      key: 'outer',
      value: 'outer'
    }, {
      key: 'inner',
      value: 'inner'
    }, {
      key: 'insideLeft',
      value: 'insideLeft'
    }, {
      key: 'insideRight',
      value: 'insideRight'
    }, {
      key: 'insideTop',
      value: 'insideTop'
    }, {
      key: 'insideBottom',
      value: 'insideBottom'
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