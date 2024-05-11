import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

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

                const emotions = [
                    { name: 'Negativo', xPos: left + 2, yPos: bottom - 110, textAlign: 'left' },
                    { name: 'Positvo', xPos: right - 43, yPos: bottom - 110, textAlign: 'left' },
                    { name: 'Alta', xPos: right - 235, yPos: top + 10, textAlign: 'left' },
                    { name: 'Baja', xPos: right - 235, yPos: bottom - 5 , textAlign: 'left' },
                    { name: 'ENOJADO', xPos: right - 400, yPos: top + 57 , textAlign: 'left' },
                    { name: 'FELIZ', xPos: right - 100, yPos: top + 57 , textAlign: 'left' },
                    { name: 'TRISTE', xPos: right - 400, yPos: bottom - 50, textAlign: 'left' },
                    { name: 'RELAJADO', xPos: right - 100, yPos: bottom - 50, textAlign: 'left' }
                ];

                emotions.forEach(item => {
                    ctx.font = '12px sans-serif';
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
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                scales: {
                    y: {
                        position: 'center',
                        min: 5,
                        max: 0
                    },
                    x: {
                        position: 'center',
                        min: -1,
                        max: 1
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
