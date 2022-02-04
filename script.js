//Data is the array that will be graphed
let data = [
  [1, 'label1'],
  [2, 'label2'],
  [3, 'label3'],
  [4, 'label4'],
  [5, 'label5']
];
let options = {
  width: '100%',
  height: '800px',
  barColor: '#FFFDD0',
  labelColor: 'black',
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
  //Keeps the label width the same as the background width
  $("#label").css("width", options.width);
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
    $('.bars p').css('bottom', '0');
  }

  //Sets the data's color
  $('.bars p').css('color', options.labelColor);

}


//Generates a span for each data entry
function makeElements() {
  const largestElement = getLargest();
  let barHeight = 0;

  for(let i = 0; i < data.length; i++) {
    //Appends a new span to the element (declared above) with a class of 'bars' and a unique id of 'bar' + i
    $(element).append($("<span class='bars' id='bar" + i + "'></span>"));
    //Appends a new paragraph to the span we just created
    $("#bar" + i).append($("<p>" + data[i][0] + "</p>"));

    //Sets a height for the bar based on the largest data entry
    barHeight = (data[i][0] / largestElement) * 100;
    $('#bar' + i).css('height', (barHeight + '%'));


  }
  //change the bars width
  //$('.bars').css("width", '75px');
}



//Returns the largest value from the data
function getLargest() {
  let largest = 0;
  //Iterate through the data array and compare the current element with the largest saved number
  for(let i = 0; i < data.length; i++) {
    if(data[i][0] > largest) {
      largest = data[i][0];
    }
  }
  return largest;
}

//Runs when document is done loading
$(document).ready(function(){
  drawBarChart();
});

