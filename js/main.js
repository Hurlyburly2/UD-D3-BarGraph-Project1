

d3.json("data/revenues.json").then(data => {
  
  data.forEach(month => {
    month.revenue = parseInt(month.revenue)
    month.profit = parseInt(month.profit)
  })
  
})
