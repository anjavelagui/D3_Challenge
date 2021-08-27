// @TODO: YOUR CODE HERE!
//Setting up chart - Creating width and height sets
var svgWidth = 900;
var svgHeight = 500;

var margin = {top:20, right: 40, botton: 80, left:100};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create a SVG wrapper to hold chart and set margins 
var svg = d3.select('#scatter').append('svg')
   .attr('width', svgWidth)
   .attr('height', svgHeight)
   .attr('class', "chart");

//shift everything over by the margins
var chartGroup = svg.append('g')
   .attr("transform", `translate(${margin.left}, ${margin.top})`);
d3.select("body").append("div").attr("class", "tooltip").style("opacity",0);

// import data using D3 
d3.csv("/data/data.csv", function(err, healthdata) {
   if (err) throw err;
   console.log(healthdata)
   healthdata.forEach(function(data) {
      data.poverty = +data.poverty; 
      data.healthcare = +data.healthcare;
      data.obesity = +data.obesity;
      data.age = +data.age;
      data.income = +data.income;
      data.smokes = +data.smokes; 
   });

   //Scale functions
   var xLinearScale = d3.scaleLinear().range([0, width]);
   var yLinearScale = d3.scaleLinear().range([height, 0]);

   //Create functions for axis
   var bottomAxis = d3.axisBottom(xLinearScale);
   var leftAxis = d3.axisLeft(yLinearScale);

   var xMin;
   var xMax;
   var yMin;
   var yMax;

   xMin = d3.min(healthData, function (data) {
      return data.healthcare;
   });
   



    
    
 });