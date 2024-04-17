import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-annotation';

export const ScatterPlot = () => {
    const chartContainer = useRef(null);
  
    useEffect(() => {
        const ctx = chartContainer.current.getContext('2d');
      
        let data = {
            datasets: [{
                label: "Scatter Plot",
                data: [
                    { x: -3, y: 2, label: 'sad' },
                    { x: 1, y: -4, label: 'happy' },
                    { x: 2, y: 3, label: 'angry' },
                ],
                backgroundColor: "rgba(255, 99, 132, 0.5)"
            }]
        };
      
        let options = {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
                annotation: {
                    annotations: {
                        backgroundLabel: {
                            type: 'box',
                            xMin: -4,
                            xMax: -4,
                            yMin: 0,
                            yMax: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderColor: 'rgba(0, 0, 0, 0.5)',
                            borderWidth: 1,
                            label: {
                                enabled: true,
                                content: 'Background Label',
                                position: 'center'
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    min: -5,
                    max: 5,
                    position: 'center'
                },
                y: {
                    type: 'linear',
                    min: -5,
                    max: 5,
                    position: 'center'
                }
            }
        };

        const scatterChart = new Chart(ctx, {
            type: "scatter",
            data: data,
            options: options
        });
  
        return () => {
            scatterChart.destroy();
        };
    }, []);
  
    return (
        <div style={{ width: '600px', height: '400px' }}>
            <canvas ref={chartContainer}></canvas>
        </div>
    );
};
