import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const plotLabelsColor = 'rgba(0, 0, 0, 0.7)'
const plotDotColor = 'rgb(82,107,122)'

export const ScatterPlot = ({xpos, ypos}) => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        const scatterLabels = {
            id: 'scatterLabels',
            beforeDatasetsDraw: (chart, args, plugins) => {
                const {ctx, data, chartArea: {left, right, top, bottom}} = chart;
                ctx.save();
                ctx.fillStyle = plotLabelsColor

                const valueReferences = [
                    { name: 'Negativo', xPos: left + 2, yPos: bottom - 110, textAlign: 'left' },
                    { name: 'Positvo', xPos: right - 43, yPos: bottom - 110, textAlign: 'left' },
                    { name: 'Alta', xPos: right - 235, yPos: top + 10, textAlign: 'left' },
                    { name: 'Baja', xPos: right - 235, yPos: bottom - 5 , textAlign: 'left' },
                ]

                const emotions = [
                    { name: 'Enojado', xPos: right - 400, yPos: top + 57 , textAlign: 'left' },
                    { name: 'Feliz', xPos: right - 100, yPos: top + 57 , textAlign: 'left' },
                    { name: 'Triste', xPos: right - 400, yPos: bottom - 50, textAlign: 'left' },
                    { name: 'Relajado', xPos: right - 100, yPos: bottom - 50, textAlign: 'left' }
                ];

                valueReferences.forEach(item => {
                    ctx.font = '12px sans-serif';
                    ctx.textAlign = item.textAlign;
                    ctx.fillText(item.name, item.xPos, item.yPos);
                });

                emotions.forEach(item => {
                    ctx.font = '20px sans-serif';
                    ctx.textAlign = item.textAlign;
                    ctx.fillText(item.name, item.xPos, item.yPos);
                });

                ctx.restore();
            }
        };

        const config = {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Arousal',
                    data: [{ x: xpos, y: ypos }],
                    backgroundColor: 'rgba(255, 26, 104, 0.2)',
                    borderColor: 'rgba(255, 26, 104, 1)',
                    borderWidth: 1,
                    pointBackgroundColor: plotDotColor,
                    pointBorderColor: plotDotColor,
                    pointRadius: 6,
                }]
            },
            options: {
                animation: false,
                scales: {
                    y: {
                        position: 'center',
                        min: 5,
                        max: 0,
                        ticks: {
                            color: plotLabelsColor // Color de los números de la escala del eje Y
                        }
                    },
                    x: {
                        position: 'center',
                        min: -1,
                        max: 1,
                        ticks: {
                            color: plotLabelsColor // Color de los números de la escala del eje Y
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            plugins: [scatterLabels]
        };

        if (chartInstance) {
            chartInstance.destroy();
        }

        const newChartInstance = new Chart(ctx, config);
        setChartInstance(newChartInstance);

        const resizeChart = () => {
            newChartInstance.resize();
        };

        resizeChart();
        window.addEventListener('resize', resizeChart);

        return () => {
            window.removeEventListener('resize', resizeChart);
            newChartInstance.destroy();
        };
    }, [xpos, ypos]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
};
