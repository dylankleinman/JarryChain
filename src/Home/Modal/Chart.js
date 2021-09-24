import React, { useEffect, useState, useRef } from 'react';
import { createChart } from 'lightweight-charts';


const Chart = (props) => {
    const chartRef = useRef();

    const dateValueArray = props.data.map(function(x){
        return {
            time: new Date(x[0]).toISOString().split('T')[0],
            value: x[1]
        }
    })
      

    dateValueArray.splice(dateValueArray.length - 2, 1);
    useEffect(() => {
      const chart = createChart(chartRef.current, { 
          width: 716, 
          height: 300,
        rightPriceScale: {
                borderVisible: false,
            },
        timeScale: {
                borderVisible: false,
        }   ,
        });
      
        const lineSeries = chart.addLineSeries();
        lineSeries.setData(dateValueArray);
        chart.timeScale().fitContent();
        var areaSeries = chart.addAreaSeries({
            topColor: 'rgba(33, 150, 243, 0.56)',
            bottomColor: 'rgba(33, 150, 243, 0.04)',
            lineColor: 'rgba(33, 150, 243, 1)',
            lineWidth: 2,
        });
      
        const darkTheme = {
            chart: {
                layout: {
                    backgroundColor: '#2B2B43',
                    lineColor: '#2B2B43',
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
            },
            series: {
                    topColor: 'rgba(32, 226, 47, 0.56)',
                    bottomColor: 'rgba(32, 226, 47, 0.04)',
                    lineColor: 'rgba(32, 226, 47, 1)',
            },
        };

        var themesData = {
            Dark: darkTheme,
        };
    
        function syncToTheme(theme) {
            chart.applyOptions(themesData[theme].chart);
            areaSeries.applyOptions(themesData[theme].series);
        }
        syncToTheme('Dark');
    }, []);

    
  
    return (
      <div className="chart-container">
        {/* <h2>{props.name}</h2> */}
        <div ref={chartRef} />
      </div>
    );
  };
  export default Chart;