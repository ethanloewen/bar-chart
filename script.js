let data = [1, 2, 3, 4, 5, 10, 1, 10, 3];
let options = {
  width: '50px',
  height: '',
  barColor: '',
  labelColor: '',
  spacing: '',
  axes: ''
}
let element = '#background';


//(data: array)(options: object)(element: DOM element to render into)
function drawBarChart(data, options, element) {
  makeElements();
}

//Created an element with jQuery
//let elm = $("<div></div>").text("Text.");
//$('#background').append(elm)


//Generates a span for each data entry
function makeElements() {
  const largestElement = getLargest();
  let barHeight = 0;

  for(let i = 0; i < data.length; i++) {
    //Appends a new span to the element (declared above) with a class of 'bars' and a unique id of 'bar' + i
    $(element).append($("<span class='bars' id='bar" + i + "'></span>").text(data[i]));

    barHeight = (data[i] / largestElement) * 100;
    console.log(barHeight);
    $('#bar' + i).css('height', (barHeight + '%'));
  }
  //change the bars width
  $('.bars').css("width", '50px');
}

//Returns the largest value from the data
function getLargest() {
  let largest = 0;
  //Iterate through the data array and compare the current element with the largest saved number
  for(let i = 0; i < data.length; i++) {
    if(data[i] > largest) {
      largest = data[i];
    }
  }
  return largest;
}

//Runs when document is done loading
$(document).ready(function(){
  drawBarChart();
});

