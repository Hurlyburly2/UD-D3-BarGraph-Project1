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
  })
  
  let y = d3.scaleLinear()
    .domain([0, d3.max(data, (month) => { return month.revenue })])
    .range([canvasHeight, 0])
  
  let x = d3.scaleBand()
    .domain(data.map((month) => { return month.month }))
    .range([0, canvasWidth])
    .paddingInner(0.3)
    .paddingOuter(0.3)
  
  let rectangles = graphGroup.selectAll("rect")
    .data(data)
    
  rectangles.enter()
    .append("rect")
      .attr("width", x.bandwidth())
      .attr("height", (month) => {
        return canvasHeight - y(month.revenue)
      })
      .attr("x", (month) => {
        return x(month.month)
      })
      .attr("y", (month) => {
        return y(month.revenue)
      })
      .attr("fill", "grey")
  
}).catch(error => {
  console.log(error)
})
