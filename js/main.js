let margin = { top: 10, right: 10, bottom: 200, left: 100 }

let canvasWidth = 600 - margin.right - margin.left;
let canvasHeight = 500 - margin.top - margin.bottom;

let svg = d3.select("#chart-area").append("svg")
  .attr("width", canvasWidth + margin.right + margin.left)
  .attr("height", canvasHeight + margin.top + margin.bottom)
  
let graphGroup = svg.append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

d3.json("data/revenues.json").then(data => {
  
  data.forEach(month => {
    month.revenue = parseInt(month.revenue)
    month.profit = parseInt(month.profit)
  })
  
  graphGroup.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .attr("fill", "grey")
  
})
