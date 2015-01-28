angular
  .module('hplcSimulator')
  .service('chromatogram', [ Chromatogram ]);

function Chromatogram() {
};

/*
  simulator = an instance of Simulator
  selector = a css selector for the chart "container"
*/
Chromatogram.prototype.draw = function (simulator, selector) {
  var svgWidth = 844;
  var svgHeight = svgWidth / 1.78;
  
  var margin = {top: 20, right: 40, bottom: 50, left: 20},
  width = svgWidth - margin.left - margin.right;
  height = svgHeight - margin.top - margin.bottom;
  
  var data = [];
  for(var i = 1; i <= width; i++) {
    //data.push( [i/width, 1/Math.sqrt(i/3)] );
    data.push( [i/width, Math.sqrt(1/i)] );
  }
  
  var x = d3.scale.linear().domain([0, 1]).range([0, width]);
  
  var y = d3.scale.linear().domain([1, 0]).range([0, height]);
  
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  
  var yAxis = d3.svg.axis().scale(y).orient("left");
  
  var line = d3.svg.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });
  
  var svg = d3.select(selector).append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + margin.left + "," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")")
    .call(yAxis);

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")")
    .attr("d", line);
};
