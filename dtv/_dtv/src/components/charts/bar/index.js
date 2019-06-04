import './index.less';
import Chart from '../';
export default class Bar extends Chart {
  constructor(props) {
    super(props);
    this.init();
  }
  init() {
    this.refresh();
  }
  refresh() {
    if(!this.chart) {
      this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
      this.chart = echarts.init(this.el);
    }
    this.data = [{"name":"http","value":45},{"name":"tcp","value":88},{"name":"udp","value":132},{"name":"https","value":111}];
    this.chart.setOption(this.getOption());
  }
  resize() {
    //this.refresh();
    this.chart.resize();
  }
  getOption() {
    console.log(this.config);
    let styledata = this.config['styledata'] || {},
    jsondata = this.config['jsondata'] || {},
    eventdata = this.config['eventdata'] || {},
    ds = [],
    legend_data = [],
    data = this.data;
    //let legend_type = 'scroll';
    for(let i = 0; i < data.length; i++) {
      legend_data.push(data[i]['name']);
      ds.push(data[i]['value']);
    }
    /*if(screen.width <= 1366) {
      legend_type = 'scroll';
    } else {
      legend_type = 'plain';
    }*/
    return {
      grid: {
        top: styledata['grid.top'],
        left: styledata['grid.left'],
        right: styledata['grid.right'],
        bottom: styledata['grid.bottom'],
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: legend_data,
        textStyle: {
          color: '#ccc',
          fontFamily: styledata['fontFamily']
        }
      },
      xAxis: {
        data: legend_data,
        splitLine: {show: false},
        axisTick: {
          show: styledata['x.show'] == 'true' ? true : false
        },
        axisLabel: {
          show: styledata['x.show'] == 'true' ? true : false,
          fontWeight: styledata['x.fontWeight'],
          fontSize: styledata['x.fontSize'],
          fontFamily: styledata['fontFamily']
        },
        axisLine: {
          show: styledata['x.show'] == 'true' ? true : false,
          lineStyle: {
            color: '#ccc'
          }
        }
      },
      yAxis: {
        splitLine: {show: false},
        axisLine: {
          show: styledata['y.show'] == 'true' ? true : false,
          lineStyle: {
            color: '#ccc'
          }
        },
        axisTick: {
          show: styledata['y.show'] == 'true' ? true : false
        },
        axisLabel: {
          show: styledata['y.show'] == 'true' ? true : false,
          fontWeight: styledata['y.fontWeight'],
          fontSize: styledata['y.fontSize'],
          fontFamily: styledata['fontFamily']
        }
      },
      series: [{
        name: 'bar',
        type: 'bar',
        label: {
          normal: {
            show: styledata['label'] == 'true' ? true : false,
            position: styledata['label.position'],
            fontWeight: styledata['label.fontWeight'],
            fontSize: styledata['label.fontSize'],
            fontFamily: styledata['fontFamily']
          }
        },
        barWidth: styledata['barWidth'] + '%',
        itemStyle: {
          normal: {
            barBorderRadius: parseInt(styledata['barBorderRadius'], 10),
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#14c8d4'},
                {offset: 1, color: '#43eec6'}
              ]
            )
          }
        },
        data: ds
      }]
    };
  }
}