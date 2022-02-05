//Data that will be graphed
let data = [
  [1, 'label 1'],
  [2, 'label 2'],
  [7, 'label 3'],
  [1, 'label 4'],
  [5, 'label 5']
];

//Options to set how the data will be displayed
let options = {
  width: '100%',              //Can be '%' or 'px'
  height: 800,                //Always in 'px'
  barColor: '#FFFDD0',
  labelColor: 'black',
  spacing: '',
  axesStep: 1,                 //Sets how often ticks are made on the Y-axis
  valuesPosition: 'centre',    //'top', 'centre', or 'bottom'
  titleSize: '30px'            //Should be 100px or less
}

let element = '#background';


//(data: array)(options: object)(element: DOM element to render into)
function drawBarChart(data, options, element) {
  setDimensions(element, options); //Always call first, this sets the size of the background
  makeElements(data, options);
  setOptions(options);
}


//Set the width and height of the background div
function setDimensions(elm, opt) {
  $(elm).css("width", opt.width);
  $(elm).css("height", opt.height + 'px');
  //Forces the height of the container to match the background
  $(".container").css("height", opt.height + 'px')
  //Keeps the label width the same as the background width
  $("#label").css("width", opt.width);
}


//Generates a span for each data entry
function makeElements(data, opt) {
  const largestElement = getLargest(data);
  let barHeight = 0;

  for(let i = 0; i < data.length; i++) {
    //Appends a new span to the element (declared above) with a class of 'bars' and a unique id of 'bar' + i
    $(element).append($("<span class='bars' id='bar" + i + "'></span>"));
    //Appends a new paragraph to the span we just created
    $("#bar" + i).append($("<p>" + data[i][0] + "</p>"));

    //Sets a height for the bar based on the largest data entry
    barHeight = (data[i][0] / largestElement) * 100;
    $('#bar' + i).css('height', (barHeight + '%'));

    //Appends a new label for each of the bars
    $("#label").append($("<h3>" + data[i][1] + "</h3>"));
  }

  //Draw the axis
  drawAxis(opt, largestElement);

}


function setOptions(opt) {
  //Set the background color of the bars
  $(".bars").css("background-color", opt.barColor);

  //Set the position of the values
  if(opt.valuesPosition === 'top') {
    $('.bars p').css('top', '20px');
  }
  else if(opt.valuesPosition === 'centre') {
    $('.bars p').css('top', '50%');
  }
  else if(opt.valuesPosition === 'bottom') {
    $('.bars p').css('bottom', '0');
  }

  //Sets the label color (and the data color)
  $('#label h3').css('color', opt.labelColor);
  $('.bars p').css('color', opt.labelColor);
}


//Returns the largest value from the data
function getLargest(data) {
  let largest = 0;
  //Iterate through the data array and compare the current element with the largest saved number
  for(let i = 0; i < data.length; i++) {
    if(data[i][0] > largest) {
      largest = data[i][0];
    }
  }
  return largest;
}

let heightArr = [];
//Creates a grid for the y-axis
function drawAxis(opt, largest) {
  //Finds what size one unit is, then finds what size a step is (all in px)
  const unit = opt.height / largest;
  const step = opt.axesStep * unit;

  let count = 0;
  for(let i = step; i <= (opt.height + 1); i += step) {
    //Creates a div for each step
    $(".container").append($("<div class='axis' id='axis" + count + "'></div>"));
    $('#axis' + count).css('height', i + 'px');
    //Saved heights for later
    heightArr.push(i);
    count++;
  }
}


//Runs when document is done loading
$(document).ready(function(){
  //Main function call
  drawBarChart(data, options, element);

  //Runs when mouse enters the .bars class
  $(".bars").mouseenter(function() {
    //Finds the id of the hovered element
    let hoverID = this.id;
    //Gets the height of the hovered element
    let hoverHeight = $('#' + hoverID).height();

    let closest = null;
    let closestIndex = 0;
    for(let i = 0; i < heightArr.length; i++) {
      //Check each axis div to find the closest height to the hovered element
      if(closest == null || Math.abs(heightArr[i] - hoverHeight) < Math.abs(closest - hoverHeight)) {
        closest = heightArr[i];
        closestIndex = i;
      }
    }

    //The workAxis variable is saved to use for handling mouse exit
    workAxis = '#axis' + closestIndex;
    //Sets the border top to solid
    $(workAxis).css('border-top', '3px solid black');
  });

  //Runs when mouse exits the .bars class
  $(".bars").mouseleave(function() {
    if(workAxis !== null) {
      //Sets the border top to back to dotted
      $(workAxis).css('border-top', '2px dotted black');
    }
  });

});

