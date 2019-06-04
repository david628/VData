import Select from '../select';
export default class Fontweight extends Select {
  constructor(props) {
    super(props);
    this.data = [{
      key: 'normal',
      value: 'normal'
    }, {
      key: 'bold',
      value: 'bold'
    }, {
      key: 'lighter',
      value: 'lighter'
    }, {
      key: '100',
      value: '100'
    }, {
      key: '200',
      value: '200'
    }, {
      key: '300',
      value: '300'
    }, {
      key: '400',
      value: '400'
    }, {
      key: '500',
      value: '500'
    }, {
      key: '600',
      value: '600'
    }, {
      key: '700',
      value: '700'
    }, {
      key: '800',
      value: '800'
    }, {
      key: '900',
      value: '900'
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