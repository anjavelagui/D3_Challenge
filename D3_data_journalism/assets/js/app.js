// @TODO: YOUR CODE HERE!
//Setting up chart - Creating width and height sets
var svgWidth = 900;
var svgHeight = 500;

var margin = {top:20, right: 40, botton: 60, left:50};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create a SVG wrapper to hold chart and set margins
var svg = d3
   .select('#scatter')
   .append('svg')
   .attr('width', 'svgWidth')
   .attr('height', 'svgHeight')
   .attr('class', 'chart');
   
