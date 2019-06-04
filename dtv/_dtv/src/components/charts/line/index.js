import './index.less';
import Chart from '../';
export default class Line extends Chart {
  constructor(props) {
    super(props);
    this.init();
  }
  init() {
    this.refresh();
  }
  refresh(param) {
    if(!this.chart) {
      this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
      this.chart = echarts.init(this.el);
    }
    this.chart.setOption(this.getOption([{"name":"http","value":45},{"name":"tcp","value":88},{"name":"udp","value":132},{"name":"https","value":111}]));
  }
  resize() {
    //this.refresh();
    this.chart.resize();
  }
  getOption(data) {
    let ds = [];
    let legend_data = [];
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter:'{a}:{c}次'
      },
      grid: {
        top: "20px",
        left: '3%',
        right: '4%',
        bottom: '30px',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color:"#999"
          }
        },
        data: legend_data
      }],
      yAxis: [{
        axisTick: {
          show: false
        },
        type: 'value',
        splitLine: {
          show: false,
          lineStyle: {
            color: ["#333333"]
          }
        },
        axisLine: {
          lineStyle:{
            color: "#999"
          }
        }
      }],
      textStyle: {
        color: "#999999"
      },
      series: [{
        type: 'line',
        lineStyle: {
          normal: {
            color:'rgb(8,121,223)'
          }
        },
        itemStyle: {
          normal: {
            color: "rgb(8,121,223)"
          }
        },
        areaStyle: {
          normal: {
            color:{
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(8,121,223,0.8)'
              }, {
                offset: 1,
                color: 'rgba(8,121,223,0)'
              }]
            }
          }
        },
        data: ds
      }]
    }
  }
}