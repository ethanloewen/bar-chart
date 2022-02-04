//(data: array)(options: object)(element: DOM element to render into)
//function drawBarChart(data, options, element) {

//}

//Created an element with jQuery
//let elm = $("<div></div>").text("Text.");
//$('#background').append(elm)
let data = [1, 2, 3, 4, 5];
let options = {
  width: '',
  height: '',
  barColor: '',
  labelColor: '',
  spacing: '',
  axes: ''
}
let element = '#background';

function makeElements() {
  for(let i = 0; i < data.length; i++) {
    $(element).append($("<span class='bar'></span>").text("test"));
  }
}

$(document).ready(function(){
  makeElements();
});

