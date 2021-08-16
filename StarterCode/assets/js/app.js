// @TODO: YOUR CODE HERE!
//Creating width and height sets
var svgWidth = 900;
var svgHeight = 500;

//Creating margin
var margin = {top:20, right: 40, botton: 80, left:100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create a SVG wrapper
var svg = d3
   .select('#scatter')
   .append('svg')
   .attr('width', 'svgWidth')
   .attr('height', 'svgHeight')
   .append('g')
   .attr('class', 'chart')
   .attr('fill', 'white')
   .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Append a SVG group
var chart = svg.append('g')
   .attr('transform', `translate(${margin.left}, ${margin.top})`);

//Set axis names
var xLabel = "poverty"
var yLabel = "healthcare"   

//Setting up SVG correlation areas
var svg2Width = 960;
var svg2Height = 100;

//Define Charts margins
var margin2 = { top:40, right:10, bottom: 10, left:10};

//Defining dimension of chart area
var dataWidth =svg2Width - margin.left -margin.right;
var dataHeight = svg2Height - margin.top - margin.bottom;

//Select bady and setting dimensions
var svg2 = d3.select("#linRegress")
   .append('svg')
   .attr('width', svgWidth)
   .attr('height', svg2Height)
   .attr('fill', 'white');

//loading data fron csv file
d3.csv('assets/data/data.csv').then(function(data) {
    var statesData =data;
    console.log(statesData);

    statesData.forEach(function(data){
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
        data.income = +data.income;   
    });
    


})

