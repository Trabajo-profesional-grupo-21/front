import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export const ScatterPlot = () => {
    const chartRef = useRef(null);
    const [chartVersion, setChartVersion] = useState(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const data = {
            datasets: [{
                label: 'Arousal',
                data: [
                    { x: -4.5, y: 0.9 }
                ],
                backgroundColor: [
                    'rgba(255, 26, 104, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(0, 0, 0, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 26, 104, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(0, 0, 0, 1)'
                ],
                borderWidth: 1
            }]
        };

        const scatterLabels = {
            id: 'scatterLabels',
            beforeDatasetsDraw: ((chart, args, plugins) => {
                const {ctx, data, chartArea: {left, right, top, bottom}} = chart;
                ctx.save();

                const emotions = [
                    {
                        name: 'emotion', 
                        xPos: left + 5, 
                        yPos: top + 15, 
                        textAlign: 'left',
                    },
                ]
                emotions.forEach((item) => {
                    showEmotion(item.name, item.xPos, item.yPos, item.textAlign)
                })

                function showEmotion(emotion, positionX, positionY, textAlign) {
                    ctx.font = '12px sans-serif';
                    ctx.textAlign = textAlign;
                    ctx.fillText(emotion, positionX, positionY)
                }
            })
        }

        const config = {
            type: 'scatter',
            data: data,
            options: {
                scales: {
                    y: {
                        position: 'center',
                        min: -1,
                        max: 1,
                    },
                    x: {
                        position: 'center',
                        min: -5,
                        max: 5,
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                // configuracion que remueve la grilla
               /*  scales: {
                    y: {
                        grid: {
                            display: false
                        },
                        position: 'center',
                        min: -1,
                        max: 1,
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        position: 'center',
                        min: -5,
                        max: 5,
                    }
                } */
            },
            plugins: [scatterLabels]
        };

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        if (chartRef.current) {
            chartInstanceRef.current = new Chart(chartRef.current, config);
        }

        // Set Chart.js version
        setChartVersion(Chart.version);

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };

    }, []);

    return (
        <div>
            <div className="chartCard">
                <div className="chartBox">
                    <canvas ref={chartRef} id="myChart"></canvas>
                </div>
            </div>
        </div>
    );
};