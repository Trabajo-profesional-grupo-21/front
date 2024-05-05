import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export const ScatterPlot = ({xpos, ypos}) => {
    const chartRef = useRef(null);
    const [chartVersion, setChartVersion] = useState(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        var data = {
            datasets: [{
                label: 'Arousal',
                data: [
                    { x: xpos, y: ypos }
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
                        name: 'Negativo', 
                        xPos: left + 2, 
                        yPos: bottom - 110, 
                        textAlign: 'left',
                    },
                    {
                        name: 'Positvo', 
                        xPos: right - 43, 
                        yPos: bottom - 110, 
                        textAlign: 'left',
                    },
                    {
                        name: 'Alta', 
                        xPos: right - 235, 
                        yPos: top + 10, 
                        textAlign: 'left',
                    },
                    {
                        name: 'Baja', 
                        xPos: right - 235, 
                        yPos: bottom - 5 , 
                        textAlign: 'left',
                    },
                    {
                        name: 'ENOJADO', 
                        xPos: right - 400, 
                        yPos: top + 57 , 
                        textAlign: 'left',
                    },
                    {
                        name: 'FELIZ', 
                        xPos: right - 100, 
                        yPos: top + 57 , 
                        textAlign: 'left',
                    },
                    {
                        name: 'TRISTE', 
                        xPos: right - 400, 
                        yPos: bottom - 50, 
                        textAlign: 'left',
                    },
                    {
                        name: 'RELAJADO', 
                        xPos: right - 100, 
                        yPos: bottom - 50, 
                        textAlign: 'left',
                    }
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
                animation: false,
                scales: {
                    y: {
                        position: 'center',
                        min: 5,
                        max: 0,
                    },
                    x: {
                        position: 'center',
                        min: -1,
                        max: 1,
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

    }, [xpos, ypos]);

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