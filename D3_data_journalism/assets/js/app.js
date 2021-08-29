// @TODO: YOUR CODE HERE!
//Setting up chart - Creating width and height sets
var svgWidth = 960
var svgHeight = 500

var margin = {top:20, right: 40, botton: 100, left:100}
var width = svgWidth - margin.left - margin.right
var height = svgHeight - margin.top - margin.bottom

//Create a SVG wrapper to hold chart and set margins
var svg = d3.select('#scatter').append('svg')
   .attr('width', svgWidth)
   .attr('height', svgHeight)
   
//shift everything over by the margins
var chartGroup = svg.append('g')
   .attr("transform", `translate(${margin.left}, ${margin.top})`).classed('chart', true);

// import data using D3 
d3.csv("assets/data/data.csv").then(function(data) {
   data.forEach(function(info) {  
      info.poverty = +info.poverty
      info.healthcare = +info.healthcare
      info.obesity = +info.obesity 
      info.age = +info.age 
      info.income = +info.income
      info.smokes = +info.smokes
   })
   
      //Scale functions
      var xScale = d3.scaleLinear()
         .domain([30, d3.max(data, d => d.age)])
         .range([height, 0])
         .nice()

      var yScale = d3.scaleLinear()
         .domain([8, d3.max(data, d => d.smokes)])
         .range([height, 0])
         .nice()

         //Create functions for axis
      var bottomAxis = d3.axisBottom(xScale)
      var leftAxis = d3.axisLeft(yScale)

      //append axes to chart
      chartGroup  = svg.append('g')
         .attr("transform", `translate(0, ${height})`)
         .call(bottomAxis)

      chartGroup.append('g')
         .call(leftAxis) 

      //Now create the circles
      var circleGroup = chartGroup.selectAll("circle")
         .data(data)
         .enter()   
         .append("circle")
         .classed("stateCircle", true)
         .attr("cx", d => xScale(d.age))
         .attr("cy", d => yScale(d.smokes))
         .attr("r", "15")
         .attr("fill", "green")
         .attr("opacity", .5)
         
      chartGroup.append("g")
         .selectAll("text")
         .style("font-size", "11px")
         .data(data)
         .enter()
         .append("text")
         .classed("stateText", true) 
         .text(d=>d.abbr)
         .attr("x", d=>xScale(d.age))
         .attr("y", d=>yScale(d.smokes))
         .attr("aligment-baseline", "central")

      //Initializing tooltips
      var toolTip = d3.tip()
         .attr("class", "d3-tip")
         .offset([80, -60])
         .html(function(d) {
            return (`${d.state}<br>Median Age: ${d.age}<br>% who Smoke: ${d.smokes}`)
         })

      //Creating tooltip on the  and creating listeners
      chartGroup.call(toolTip);

      circleGroup.on("mouseover", function(circle) {
         toolTip.show(circle, this)
      })

      //mouseout event
      .on("mouseout", function(circle, index) {
         toolTip.hide(data);
      })
   
      //Create labels for axis
      chartGroup.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 0 -margin.left + 40)
         .attr("x", -(height / 2))
         .attr("dy", "1em")
         .attr("class", "aText")
         .text("Smokes(%)");

      chartGroup.append("text")  
         .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
         .attr("class", "aText")
         .text("Age (Median)")
   })
