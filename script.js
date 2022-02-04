//Data is the array that will be graphed
let data = [1, 2, 3, 4, 5, 10, 2, 5.5];
let options = {
  width: '100%',
  height: '800px',
  barColor: '#FFFDD0',
  labelColor: '',
  spacing: '',
  axes: '',
  valuesPosition: 'top' //'top', 'centre', or 'bottom'
}
let element = '#background';


//(data: array)(options: object)(element: DOM element to render into)
function drawBarChart(data, options, element) {
  setDimensions(); //Always call first, this sets the size of the background
  makeElements();
  setOptions();
}

//Set the width and height of the background div
function setDimensions() {
  $(element).css("width", options.width);
  $(element).css("height", options.height);
}


function setOptions() {
  //Set the background color of the bars
  $(".bars").css("background-color", options.barColor);

  //Set the position of the values
  if(options.valuesPosition === 'top') {
    $('.bars p').css('top', '20px');
  }
  else if(options.valuesPosition === 'centre') {
    $('.bars p').css('top', '50%');
  }
  else if(options.valuesPosition === 'bottom') {
    //STILL NEED TO ADD
    $('.bars p').css('bottom', '0');
  }
}


//Generates a span for each data entry
function makeElements() {
  const largestElement = getLargest();
  let barHeight = 0;

  for(let i = 0; i < data.length; i++) {
    //Appends a new span to the element (declared above) with a class of 'bars' and a unique id of 'bar' + i
    $(element).append($("<span class='bars' id='bar" + i + "'></span>"));
    //Appends a new paragraph to the span we just created
    $("#bar" + i).append($("<p>" + data[i] + "</p>"));

    //Sets a height for the bar based on the largest data entry
    barHeight = (data[i] / largestElement) * 100;
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

