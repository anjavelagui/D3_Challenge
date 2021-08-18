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

//Importing CSV file data with d3's
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

    var xLinearScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain([d3.margin(statesData, data => data[xLabel]) - 2, d3.max(statesData, data => data[xLabel] +2)]);
    
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([d3.margin(statesData, data => data[yLabel]) -2, d3.max(statesData, data => data[yLabel]) +2]);
        
    //Initilize axis 
    var bottonAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    //Appending X & Y axis
    var xAxis = chartGroup.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .scaleLinear(bottomAxis);

    var yAxis = chartGroup.append('g')
        .scaleLinear(leftAxis);

     //Append initial cicles  and create a scatterplot
    var ciclesGroup = chartGroup.sellectAll('g circle')
        .data(statesData)
        .enter()
        .append('g')
     
    //Append axis locations for circles
    var circlesLoc = circlesGroup.append('circle')
        .attr('cx', d => xLinearScale(d[xLabel])) 
        .attr('cy', d => yLinearScale(d[yLabel]))
        .attr('r', 17)
        .classed("stateCircle", true);
        
    //Add labels 
    var circlesLabel = circlesGroup.append('text')
        .ext(d => d.abbr)
        .attr("dx", d => xLinearScale(d[xLabel]))
        .attr("dy", d => yLinearScale(d[yLabel]) + 5)
        .classed("stateText", true);
    
    //Group the x-axis and create labels
    var xlabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight})`);

    //Using Xtext to append SVG file with y coordinates specifires to create space the values
    //Poverty
    var povertyLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "poverty")
        .text("In Poverty (%)")
        .classed("active", true);

    //Age
    var ageLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "age")
        .text("Age (Median)")
        .classed("inactive", true); 
    
    //Income
    var incomeLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 80)
        .attr("value", "income") // value to grab for event listener
        .text("Household Income (Median)")
        .classed("inactive", true);

    // //Using Ytext to append SVG file with y coordinates specifires to create space the values   
    var ylabelsGroup = chartGroup.append("g");

    //Lacks of Helathcare
    var healthcareLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(chartHeight / 2))
        .attr("y", -40)
        .attr("value", "healthcare") // value to grab for event listener
        .text("Lacks Healthcare (%)")
        .classed("active", true);

    //Smokes
    var smokesLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(chartHeight / 2))
        .attr("y", -60)
        .attr("value", "smokes") // value to grab for event listener
        .text("Smokes (%)")
        .classed("inactive", true);

    //Obese
    var obeseLabel = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(chartHeight / 2))
        .attr("y", -80)
        .attr("value", "obesity") // value to grab for event listener
        .text("Obese (%)")
        .classed("inactive", true);

     // Append a group area, then set its margins
    var statsGroup = svg2.selectAll("text")
        .data([1])
        .enter()
        .append("text")
        attr("transform", `translate(${margin2.left}, ${margin2.right})`);

    // Set x and y variables for corrCoeff and linRegress
    var xArr = statesData.map(function(data) {
        return data[xLabel];
    });

    var yArr = statesData.map(function(data) {
        return data[yLabel];
    });

    var createLine = d3.line()
        .x(data => xLinearScale(data.x))
        .y(data => yLinearScale(data.y));

    var regressPoints = regressionSetup(statesData,
                                        xLabel,    
                                        yLabel, 
                                        xArr);

    var plotRegress = chartGroup.append("path")
        .attr("class", "plot")
        .attr("stroke", "purple")
        .attr("stroke-width", "1")
        .attr("fill", "none")
        .attr("d", createLine(regressPoints));

    var corrCoeff = pearson(xArr, yArr);

    // Add the SVG text element to SVG2
    var statsText = statsGroup
        .attr("x", 50)
        .attr("y", 50)
        .text("Correlation Coefficient: " + corrCoeff.toFixed(6))
        .attr("fill", "black");
    
    // Listeners for X-axis 
    xlabelsGroup.selectAll("text").on("click", function() {
    var value = d3.select(this).attr("value");
    if (value !== xLabel) {

    //Replacing xLabel for value
        xLabel = value;

    var xArr = statesData.map(function(data) {
        return data[xLabel];
    });

    // Scaling x and y-axis 
    xLinearScale = xScale(statesData, xLabel);
    yLinearScale = yScale(statesData, yLabel);

    // Rendering and Updating x-axis
    xAxis = renderXAxes(xLinearScale, xAxis);
    circlesLoc = renderXCircles(circlesLoc, xLinearScale, xLabel);
    circlesLabel = renderXText(circlesLabel, xLinearScale, xLabel);

    // updates new linear regression line and correlation coefficient
    plotRegress = renderRegression(statesData, plotRegress, xLinearScale, yLinearScale, xLabel, yLabel, xArr);

    var corrCoeff = pearson(xArr, yArr);

    var statsText = statsGroup
        .attr("x", 50)
        .attr("y", 50)
        .text("Correlation Coefficient: " + corrCoeff.toFixed(6))
        .attr("fill", "black");

    // Updating tooltips with new info from x and y axis
    circlesGroup = updateToolTip(circlesGroup, xLabel, yLabel);

    //Changes classes to change bold text
    if (xLabel === "age") {
        povertyLabel.classed("active", false).classed("inactive", true);
        ageLabel.classed("active", true).classed("inactive", false);
        incomeLabel.classed("active", false).classed("inactive", true);
    }
    else if (xLabel === "income") {
        povertyLabel.classed("active", false).classed("inactive", true);
        ageLabel.classed("active", false).classed("inactive", true);
        incomeLabel.classed("active", true).classed("inactive", false);
    }
    else {
        povertyLabel.classed("active", true).classed("inactive", false);
        ageLabel.classed("active", false).classed("inactive", true);
        incomeLabel.classed("active", false).classed("inactive", true);
    }
}
});
    // Listeners for y-axis
        ylabelsGroup.selectAll("text").on("click", function() {

    var value = d3.select(this).attr("value");
    if (value !== yLabel) {

    //Updating and replacing with value
    yLabel = value;
    var yArr = statesData.map(function(data) {
        return data[yLabel];
    });
  
    xLinearScale = xScale(statesData, xLabel);
    yLinearScale = yScale(statesData, yLabel);

    // updates y axis with transition
    yAxis = renderYAxes(yLinearScale, yAxis);

    // updates circles 
    circlesXY = renderYCircles(circlesLoc, yLinearScale, yLabel);

    // updates circles text 
    circlesLabel = renderYText(circlesLabel, yLinearScale, yLabel);

    // updating tooltips with x and y-axis
    circlesGroup = updateToolTip(circlesGroup, xLabel, yLabel);
  
    // updates linear regression line
    plotRegress = renderRegression(statesData, plotRegress, xLinearScale, yLinearScale, xLabel, yLabel, xArr);

    // Update corrcoeff
    var corrCoeff = pearson(xArr, yArr);
    var statsText = statsGroup
        .attr("x", 50)
        .attr("y", 50)
        .text("Correlation Coefficient: " + corrCoeff.toFixed(6))
        .attr("fill", "black");

    // Changes classes to change bold text
    if (yLabel === "smokes") {
        healthcareLabel.classed("active", false).classed("inactive", true);
        smokesLabel.classed("active", true).classed("inactive", false);
        obeseLabel.classed("active", false).classed("inactive", true);
    }
    else if (yLabel === "obesity"){
        healthcareLabel.classed("active", false).classed("inactive", true);
        smokesLabel.classed("active", false).classed("inactive", true);
        obeseLabel.classed("active", true).classed("inactive", false);
    }
    else {
        healthcareLabel.classed("active", true).classed("inactive", false);
        smokesLabel.classed("active", false).classed("inactive", true);
        obeseLabel.classed("active", false).classed("inactive", true);
    }
}
});
    //Updating tooltip based on X and Y axis
    circlesGroup = updateToolTip(circlesGroup, xLabel, yLabel);
});
   