import React, {Component,} from 'react';
import './Chart.css';
import Chart from 'kaktana-react-lightweight-charts';

class Coinchart extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            options: {
                alignLabels: true,
                rightPriceScale: {
                    borderVisible: false,
                },
                timeScale: {
                    borderVisible: false,
                    barspacing: 10000,
                },
                layout: {
                    backgroundColor: '#2B2B43',
                    ineColor: '#2B2B43',
                    textColor: '#D9D9D9',
                },
                watermark: {
                    color: 'rgba(0, 0, 0, 0)',
                },
                crosshair: {
                    color: '#758696',
                },
                grid: {
                    vertLines: {
                        color: '#2B2B43',
                    },
                    horzLines: {
                        color: '#363C4E',
                    },
                },
                priceScale: {
                }
            },
        lineSeries: [{
            data: [
              ]
          }]
        }
      }

    componentDidMount(props){
        let dateValueArray = this.props.data.map(function(x){
            return {
                time: new Date(x[0]).toISOString().split('T')[0],
                value: x[1]
            }
        })
        dateValueArray.splice(dateValueArray.length - 2, 1);
        this.setState({
            lineSeries: [{
                data: dateValueArray
            }]
        })
    }

    
    render(){
        return (
            <div className="chart-container">
              {/* <div ref={chartRef} /> */}
              <Chart options={this.state.options} lineSeries={this.state.lineSeries} autoWidth height={320} />
            </div>
        );
    }
  };
  export default Coinchart;