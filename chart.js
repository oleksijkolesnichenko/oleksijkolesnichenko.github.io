var ctx = document.getElementById('chartCanvas').getContext('2d');
var myChart;
var stepInput = document.getElementById('stepInput');
var colorInput = document.getElementById('colorInput');
var gridCheckbox = document.getElementById('gridCheckbox');
var chartTypeSelect = document.getElementById('chartTypeSelect');
var backgroundInput = document.getElementById('backgroundInput');

const body = document.querySelector('body');
const container = document.querySelector('.content');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const options = document.querySelectorAll('option');
const buttons = document.querySelectorAll('button');
const selects = document.querySelectorAll('select');
const inputs = document.querySelectorAll('input');
const theme = document.querySelector('.theme');
const modal = document.querySelector('.modal-content');
// var legendCheckbox = document.getElementById('legendCheckbox');
// var minYInput = document.getElementById('minYInput');
// var maxYInput = document.getElementById('maxYInput');
    var functionLabel = 'Графік функції';

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
            functionLabel = 'Синус';
            for (var x = 0; x <= 2 * Math.PI; x += step) {
                xValues.push(x);
                yValues.push(Math.sin(x));
            }
            break;
        case 'cos':
            functionLabel = 'Косинус';
            for (var x = 0; x <= 2 * Math.PI; x += step) {
                xValues.push(x);
                yValues.push(Math.cos(x));
            }
            break;
        case 'tan':
            functionLabel = 'Тангенс';
            for (var x = -Math.PI / 2; x <= Math.PI / 2; x += step) {
                xValues.push(x);
                yValues.push(Math.tan(x));
            }
            break;
        case 'exp':
            functionLabel = 'Експоненціальна функція';
            for (var x = -10; x <= 10; x += step) {
                xValues.push(x);
                yValues.push(Math.exp(x));
            }
            break;
        case 'quadratic':
            functionLabel = 'Квадратична функція';
            for (var x = -10; x <= 10; x += step) {
                xValues.push(x);
                yValues.push(x * x);
            }
            break;
            case 'own':
                functionLabel = 'Ваша функція';
                var ownFunctionInput = document.getElementById('ownFunctionInput').value;
                var numPoints = Math.floor((2 * Math.PI) / step) + 1;
            
                for (var i = 0; i < numPoints; i++) {
                    var x = i * step;
                    xValues.push(x);
            
                    try {
                        var y = eval(ownFunctionInput.replace('x', x));
                        yValues.push(y);
                    } catch (error) {
                        window.alert('Error evaluating function:', error);
                        break;
                    }
                }
                break;
            
    }

    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: xValues,
            datasets: [{
                label: functionLabel,
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

function openModal() {
    var selectedFunction = document.getElementById('functionSelect').value;
    if(selectedFunction==='own'){
var modal = document.getElementById('modal');
  modal.style.display = 'block';

    }
}  

function closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
  
  function confirmFunction() {
    var ownFunctionInput = document.getElementById('ownFunctionInput');
    var ownFunction = ownFunctionInput.value;

    console.log('Введена функція:', ownFunction);
    closeModal();
    buildChart();
  }

  var mode = "light";
  function changeMode(){
    if (mode==="light")
    {
        mode = "dark";
        body.classList.add('darkmode-body')
        container.classList.add('darkmode-container');
        header.classList.add('darkmode-wrap');
        footer.classList.add('darkmode-wrap');
        buttons.forEach(button => {
            button.classList.add('darkmode-btn');
        });
        options.forEach(option => {
            option.classList.add('darkmode-btn');
        });
        selects.forEach(select => {
            select.classList.add('darkmode-btn');
        });
        inputs.forEach(input => {
            input.classList.add('darkmode-btn');
        });
        theme.classList.remove('darkmode-btn');
        theme.textContent = 'Light mode';
        modal.classList.add('darkmode-body');
    } else if (mode === "dark")
    {
        mode = "light";
        body.classList.remove('darkmode-body')
        container.classList.remove('darkmode-container');
        header.classList.remove('darkmode-wrap');
        footer.classList.remove('darkmode-wrap');
        buttons.forEach(button => {
            button.classList.remove('darkmode-btn');
        });
        options.forEach(option => {
            option.classList.remove('darkmode-btn');
        });
        selects.forEach(select => {
            select.classList.remove('darkmode-btn');
        });
        inputs.forEach(input => {
            input.classList.remove('darkmode-btn');
        });
        theme.classList.add('darkmode-btn');
        theme.textContent = 'Dark mode';
        modal.classList.remove('darkmode-body');

    }
  }