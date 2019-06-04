import './index.less';
import Chart from '../';
export default class Pie extends Chart {
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
    let legend_data = [];
    //let legend_type = 'scroll';
    for(let i = 0; i < data.length; i++) {
      legend_data.push(data[i]['name']);
    }
    /*if(screen.width <= 1366) {
      legend_type = 'scroll';
    } else {
      legend_type = 'plain';
    }*/
    return {
      legend: {
        //type: legend_type,
        orient: 'horizontal',
        top: '80%',
        itemWidth: 10,
        itemHeight: 10,
        x: 'center',
        y: 'top',
        textStyle: {
          fontSize: 12,
          color: '#e4e5e5'
        },
        pageIconColor: '#e4e5e5',
        pageIconInactiveColor: '#2f4554',
        pageIconSize: 10,
        pageTextStyle: {
          color: '#e4e5e5'
        },
        data: legend_data
      },
      color: ['#49d5d4','#4ab7f1','#3d97cc','#3076a4','#23557d','#b2565c','#3f79c8','#30a7e0','#bfae6a','#b9d6df'],
      series: {
        type: 'pie',
        center: ['50%', '40%'],
        radius: ['30%', '60%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            rich: {
              labelValue: {
                lineHeight: '30',
                fontSize: '18',
                fontWeight: 'bold'
              },
              labelName: {
                fontSize: '14',
                color: '#e4e5e5'
              }
            },
            formatter: function(param){
              return '{labelValue|'+param.value+'}'+'\n'+'{labelName|'+param.name+'}';
            }
          }
        },
        data: data
      }
    }
  }
  animate(d,dom) {
    var self=this;
    var isMove=true;
    var i=0;
    var len=d.length;
    $('#'+dom).on('mouseover',function(){
      isMove=false;
      self.pie.dispatchAction({
        type:'downplay',
        seriesIndex: 0
      });
    });
    $('#'+dom).on('mouseout',function(){
      isMove=true;
    });
    clearInterval(self.time);
    self.time=setInterval(function(){
      if(isMove){
        if(i==len){
          i=0;
        }
        for(var k=0;k<len;k++){
          if(k==i){
            self.pie.dispatchAction({
              type:'highlight',
              seriesIndex: 0, 
              dataIndex: i
            });
          }
          else {
            self.pie.dispatchAction({
              type:'downplay',
              seriesIndex: 0, 
              dataIndex: k
            });
          }
        }
        i++;
      }
      else { i=0 }
    },2000);
  }
}