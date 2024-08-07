import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const plotLabelsColor = 'rgba(0, 0, 0, 0.7)'
const plotDotColor = 'rgb(82,107,122)'
const expectedDotColor = 'rgb(252,196,91)';

export const ScatterPlotMultiple = ({valenceArousalData, expectedArousal, expectedValence}) => {
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

                const valenceToCanvasX = val => left + (right - left) * (val + 1) / 2;
                const arousalToCanvasY = arousal => bottom - (bottom - top) * (arousal + 1) / 2;

                const valueReferences = [
                    { name: '-', xPos: valenceToCanvasX(-1), yPos: arousalToCanvasY(0), textAlign: 'left' },
                    { name: '+', xPos: valenceToCanvasX(1), yPos: arousalToCanvasY(0), textAlign: 'right' },
                    { name: '+', xPos: valenceToCanvasX(0), yPos: arousalToCanvasY(0.95), textAlign: 'center' },
                    { name: '-', xPos: valenceToCanvasX(0), yPos: arousalToCanvasY(-1), textAlign: 'center' },
                ]

                const specificEmotions = [
                     // Primer cuadrante (positivo, alta activación)
                    { name: 'asombrado', xPos: valenceToCanvasX(0.2), yPos: arousalToCanvasY(0.9), textAlign: 'center' },
                    { name: 'Emocionado', xPos: valenceToCanvasX(0.8), yPos: arousalToCanvasY(0.8), textAlign: 'center' },
                    { name: 'divertido', xPos: valenceToCanvasX(0.4), yPos: arousalToCanvasY(0.65), textAlign: 'center' },
                    { name: 'Encantado', xPos: valenceToCanvasX(0.6), yPos: arousalToCanvasY(0.3), textAlign: 'center' },
                    { name: 'Felicidad', xPos: valenceToCanvasX(0.8), yPos: arousalToCanvasY(0.4), textAlign: 'center' },
                    { name: 'contento', xPos: valenceToCanvasX(0.7), yPos: arousalToCanvasY(0.2), textAlign: 'center' },
                    { name: 'complacido', xPos: valenceToCanvasX(0.8), yPos: arousalToCanvasY(0.1), textAlign: 'center' },

                    // Segundo cuadrante (negativo, alta activación)
                    { name: 'alarmado', xPos: valenceToCanvasX(-0.2), yPos: arousalToCanvasY(0.85), textAlign: 'center' },
                    { name: 'asustado', xPos: valenceToCanvasX(-0.6), yPos: arousalToCanvasY(0.8), textAlign: 'center' },
                    { name: 'tenso', xPos: valenceToCanvasX(-0.3), yPos: arousalToCanvasY(0.65), textAlign: 'center' },
                    { name: 'ira', xPos: valenceToCanvasX(-0.8), yPos: arousalToCanvasY(0.7), textAlign: 'center' },
                    { name: 'frustrado', xPos: valenceToCanvasX(-0.8), yPos: arousalToCanvasY(0.5), textAlign: 'center' },
                    { name: 'afligido', xPos: valenceToCanvasX(-0.6), yPos: arousalToCanvasY(0.2), textAlign: 'center' },
                    { name: 'Molesto', xPos: valenceToCanvasX(-0.4), yPos: arousalToCanvasY(0.4), textAlign: 'center' },

                    // Tercer cuadrante (negativo, baja activación)
                    { name: 'miserable', xPos: valenceToCanvasX(-0.85), yPos: arousalToCanvasY(-0.2), textAlign: 'center' },
                    { name: 'tristeza', xPos: valenceToCanvasX(-0.7), yPos: arousalToCanvasY(-0.3), textAlign: 'center' },
                    { name: 'deprimido', xPos: valenceToCanvasX(-0.8), yPos: arousalToCanvasY(-0.4), textAlign: 'center' },
                    { name: 'sombrío', xPos: valenceToCanvasX(-0.8), yPos: arousalToCanvasY(-0.6), textAlign: 'center' },
                    { name: 'aburrido', xPos: valenceToCanvasX(-0.7), yPos: arousalToCanvasY(-0.8), textAlign: 'center' },
                    { name: 'caído', xPos: valenceToCanvasX(-0.2), yPos: arousalToCanvasY(-0.9), textAlign: 'center' },

                    // Cuarto cuadrante (positivo, baja activación)
                    { name: 'Contento', xPos: valenceToCanvasX(0.8), yPos: arousalToCanvasY(-0.2), textAlign: 'center' },
                    { name: 'Satisfceho', xPos: valenceToCanvasX(0.85), yPos: arousalToCanvasY(-0.3), textAlign: 'center' },
                    { name: 'Sereno', xPos: valenceToCanvasX(0.4), yPos: arousalToCanvasY(-0.4), textAlign: 'center' },
                    { name: 'A gusto ', xPos: valenceToCanvasX(0.6), yPos: arousalToCanvasY(-0.4), textAlign: 'center' },
                    { name: 'Calmado', xPos: valenceToCanvasX(0.7), yPos: arousalToCanvasY(-0.6), textAlign: 'center' },
                    { name: 'Relajado', xPos: valenceToCanvasX(0.8), yPos: arousalToCanvasY(-0.8), textAlign: 'center' },
                    { name: 'somnoliento', xPos: valenceToCanvasX(0.4), yPos: arousalToCanvasY(-0.9), textAlign: 'center' }, 
                    { name: 'Cansado', xPos: valenceToCanvasX(0.2), yPos: arousalToCanvasY(-0.8), textAlign: 'center' }

                ]

                const QuarterEmotions = [
                    { name: 'Enojado', xPos: valenceToCanvasX(-0.5), yPos: arousalToCanvasY(0.5), textAlign: 'center' },
                    { name: 'Feliz', xPos: valenceToCanvasX(0.5), yPos: arousalToCanvasY(0.5), textAlign: 'center' },
                    { name: 'Triste', xPos: valenceToCanvasX(-0.5), yPos: arousalToCanvasY(-0.5), textAlign: 'center' },
                    { name: 'Relajado', xPos: valenceToCanvasX(0.5), yPos: arousalToCanvasY(-0.5), textAlign: 'center' }
                ];

                valueReferences.forEach(item => {
                    ctx.font = '30px sans-serif';
                    ctx.textAlign = item.textAlign;
                    ctx.fillText(item.name, item.xPos, item.yPos);
                });
                specificEmotions.forEach(item => {
                    ctx.font = '12px sans-serif';
                    ctx.textAlign = item.textAlign;
                    ctx.fillText(item.name, item.xPos, item.yPos);
                });

                QuarterEmotions.forEach(item => {
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
                    label: 'valencia-exitación',
                    data : valenceArousalData,
                    //data: [{ x: 0.5, y: 0.4 },{ x: 0, y: 0.3 } ],
                    backgroundColor: 'rgba(255, 26, 104, 0.2)',
                    borderColor: 'rgba(255, 26, 104, 1)',
                    borderWidth: 1,
                    pointBackgroundColor: plotDotColor,
                    pointBorderColor: plotDotColor,
                    pointRadius: 6,
                }, 
                {
                    label: 'Valor esperado valencia-exitación',
                    data: [{ x: expectedValence, y: expectedArousal }],
                    backgroundColor: expectedDotColor,
                    borderColor: expectedDotColor,
                    borderWidth: 1,
                    pointBackgroundColor: expectedDotColor,
                    pointBorderColor: expectedDotColor,
                    pointRadius: 8,
                    pointStyle: 'rectRot' // Forma del punto (puede ser 'circle', 'rect', 'rectRot', etc.)
                }]
            },
            options: {
                animation: false,
                scales: {
                    y: {
                        position: 'center',
                        min: -1,
                        max: 1,
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
    }, [valenceArousalData]);

    return (
        <div style={{ position: 'relative', width: '100%', alignContent: "center", justifyContent: 'center', display: 'center'}}>
            <canvas ref={chartRef} style={{ width: '100%', alignContent: "center", justifyContent: 'center', display: 'center'}}></canvas>
        </div>
    );
};
