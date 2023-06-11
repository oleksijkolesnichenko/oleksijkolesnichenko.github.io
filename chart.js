var ctx = document.getElementById('chartCanvas').getContext('2d');
var myChart;
var stepInput = document.getElementById('stepInput');
var colorInput = document.getElementById('colorInput');
var gridCheckbox = document.getElementById('gridCheckbox');
var chartTypeSelect = document.getElementById('chartTypeSelect');
var backgroundInput = document.getElementById('backgroundInput');
// var legendCheckbox = document.getElementById('legendCheckbox');
// var minYInput = document.getElementById('minYInput');
// var maxYInput = document.getElementById('maxYInput');

function buildChart() {
    var selectedFunction = document.getElementById('functionSelect').value;
    var step = parseFloat(stepInput.value);
    var color = colorInput.value;
    var showGrid = gridCheckbox.checked;
    var chartType = chartTypeSelect.value;
    var backgroundColor = backgroundInput.value;
//  var showLegend = legendCheckbox.checked;
//  var minY = parseFloat(minYInput.value);
//  var maxY = parseFloat(maxYInput.value);
    var xValues = [];
    var yValues = [];

    if (myChart) {
        myChart.destroy();
    }

    switch (selectedFunction) {
        case 'sin':
            for (var x = 0; x <= 2 * Math.PI; x += step) {
                xValues.push(x);
                yValues.push(Math.sin(x));
            }
            break;
        case 'cos':
            for (var x = 0; x <= 2 * Math.PI; x += step) {
                xValues.push(x);
                yValues.push(Math.cos(x));
            }
            break;
        case 'tan':
            for (var x = -Math.PI / 2; x <= Math.PI / 2; x += step) {
                xValues.push(x);
                yValues.push(Math.tan(x));
            }
            break;
        case 'exp':
            for (var x = -10; x <= 10; x += step) {
                xValues.push(x);
                yValues.push(Math.exp(x));
            }
            break;
        case 'quadratic':
            for (var x = -10; x <= 10; x += step) {
                xValues.push(x);
                yValues.push(x * x);
            }
            break;
    }

    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: xValues,
            datasets: [{
                label: 'Графік функції',
                data: yValues,
                borderColor: color,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    grid: {
                        display: showGrid
                    }
                },
                y: {
                    display: true,
                    grid: {
                        display: showGrid
                    },
//                  ticks: {
//                      min: minY,
//                      max: maxY
//                  }
                }
            },
//          plugins: {
//              legend: {
//                  display: showLegend
//              }
//          },
            backgroundColor: backgroundColor
        }
    });
}

document.getElementById('drawButton').addEventListener('click', function () {
    buildChart();
});

document.getElementById('saveButton').addEventListener('click', function () {
    var canvas = document.getElementById('chartCanvas');
    var image = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.href = image;
    link.download = 'chart.png';
    link.click();
});