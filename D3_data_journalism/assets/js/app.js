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
   .attr('width', svgWidth)
   .attr('height', svgHeight)
var chartGroup =svg.append('g').attr("transform", `translate(${margin.left}, ${margin.top})`);
// Use d3 to import the data
d3.csv("data/data.csv").then(function (data) {
    data.forEach(function (data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
    data.age = +data.age;
    data.income = +data.income;
    data.smokes = +data.smokes;
 });