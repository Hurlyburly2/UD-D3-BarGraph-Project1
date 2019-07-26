let margin = { top: 10, right: 10, bottom: 200, left: 100 }

let canvasWidth = 600 - margin.right - margin.left;
let canvasHeight = 500 - margin.top - margin.bottom;

let svg = d3.select("#chart-area").append("svg")
  .attr("width", canvasWidth + margin.right + margin.left)
  .attr("height", canvasHeight + margin.top + margin.bottom)
  
let graphGroup = svg.append("g")
  .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

graphGroup.append("text")
  .attr("class", "x-axis label")
  .attr("x", canvasWidth / 2)
  .attr("y", canvasHeight + 50)
  .style("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Month")
  
graphGroup.append("text")
  .attr("class", "y-axis label")
  .attr("x", -(canvasHeight / 2))
  .attr("y", -60)
  .attr("text-anchor", "middle")
  .style("font-size", "20px")
  .attr("transform", "rotate(-90)")
  .text("Revenue")

let yAxisGroup = graphGroup.append("g")
  .attr("class", "y-axis")

let y = d3.scaleLinear()
  .range([canvasHeight, 0])

let xAxisGroup = graphGroup.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0," + canvasHeight + ")")

let x = d3.scaleBand()
  .range([0, canvasWidth])
  .paddingInner(0.3)
  .paddingOuter(0.3)

d3.json("data/revenues.json").then(data => {
  
  data.forEach(month => {
    month.revenue = parseInt(month.revenue)
  })
  
  d3.interval(() => {
    update(data)
  }, 1000)
  update(data)
  
}).catch(error => {
  console.log(error)
})

const update = (data) => {
  y.domain([0, d3.max(data, (month) => { return month.revenue })])
  x.domain(data.map((month) => { return month.month }))
  
  let xAxisCall = d3.axisBottom(x)
  xAxisGroup.call(xAxisCall)
    
  let yAxisCall = d3.axisLeft(y) 
    .tickFormat((label) => {
      return ("$" + label)
    })
  yAxisGroup.call(yAxisCall)
  
  let colors = d3.scaleOrdinal()
    .domain([0, d3.max(data, (month) => { return month.revenue })])
    .range(d3.schemeRdBu[data.length + 2])
  
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
      .attr("fill", (month) => {
        return colors(month.month)
      })
}
