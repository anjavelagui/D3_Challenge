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
d3.csv("assets/data/data.csv").then(function(healthData, err) {
   if (err) throw err;
  visualize (healthData);
   healthData.forEach(function(data) {
      data.poverty = +data.poverty; 
      data.healthcare = +data.healthcare;
      data.obesity = +data.obesity; //to used later for bonus
      data.age = +data.age;  //to used later for bonus
      data.income = +data.income; //to used later for bonus
      data.smokes = +data.smokes; //to used later for bonus 
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

   xMin = d3.min(healthData, function(data) {
      return data.healthcare;
   });

   xMax = d3.max(healthData, function(data) {
      return data.healthcare;

   });

   xMin = d3.min(healthData, function(data) {
      return data.poverty;
   });

   xMax = d3.max(healthData, function(data) {
      return data.poverty;

   });

   xLinearScale.domain([xMin, xMax]);
   yLinearScale.domain([yMin, yMax]);

   //append axes to chart
   chartGroup.append('g')
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

   chartGroup.append('g')
      .call(leftAxis); 
      
   //Now create the circles
   var cicleGroup = chartGroup.selectAll("circle")
      .data(healthData)
      .enter()   
      .append("circle")
      .attr("cx", d => xLinearScale(d.healthcare +1.2))
      .attr("cy", d => yLinearScale(d.poverty +0.2))
      .attr("r", "12")
      .attr("fill", "green")
      .attr("opacy", .5)

      .on("mouseover", function(data, index) {
         tooltip.hide(data);
      });

      //Initializing tooltips
      var tooltip = d3.tip()
         .attr("class", "tooltip")
         .offset([80, -60])
         .html(function(d) {
            return (abbr + '%');
         });

   //Creating tooltip on the  and creating listeners
   chartGroup.call(tooltip);

   circleGroup.on("click", function(data) {
      tooltip.show(data);
   })

   //mouseover event
   .on("mouseover", function(data, index){
      tooltip.hide(data);
   });

   //Create labels for axis
   chartGroup.append("text")
   .style("font-size", "11px")
   .selectAll("tspan")
   .data(healthData)
   .enter()
   .append("tspan")
      .attr("x", function(data) {
         return xLinearScale(data.healthcare +1.2);
      })
      .attr("y", function(data) {
         return xLinearScale(data.poverty +.1);
      })
      .text(function(data) {
         return data.abbr
      });

      chartGroup.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 0 -margin.left + 40)
         .attr("x", 0 - (height / 2))
         .attr("dy", "1em")
         .attr("class", "axisText")
         .text("Lacks of Healthcare(%)");

      chartGroup.append("text")  
         .attr("transform", `translate(${width / 2}, 470)`)
         .attr("class", "axisText")
         .text("In Poverty (%)");
});