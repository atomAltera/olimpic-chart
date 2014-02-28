var diameter = 400;

var chart = d3.select('.chart');


var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
    
tooltip.append('div').attr('class', 'title');
tooltip.append('div').attr('class', 'description');

var bubble = d3.layout.pack()
    .size([diameter * 2, diameter])
    .padding(10)
    
     .sort(function(x, y) {
       return y.value - x.value;
     })

var node = chart.selectAll(".node")
  .data(bubble.nodes({children: data}).filter(function(d) { return !d.children; }))
  .enter().append('g')
  .attr('class', 'node')
  .attr('transform', function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  });
  
node.append('circle')
  .attr('class', 'circle')
  .attr('r', function(d) { return d.r })
  .style('fill', 'white')
  .style('stroke', 'silver')
  .style('stroke-width', 1)
  .style('stroke-opacity', 0.5)
    
node.append('image')
  .attr('xlink:href', 'data:image/jpeg;base64,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')
  .attr('width', function(d) { return d.r * 1.2; })
  .attr('height', function(d) { return d.r * 1.2; })
  .attr('x', function(d) { return  d.r / -1.6})
  .attr('y', function(d) { return  d.r / -1.6})
  
// node.append('text')
//   .attr("class", "caption")
//   .attr("dy", "1.5em")
//   .style("text-anchor", "middle")
//   .style('fill', '#3A6EC2')
//   .style('letter-spacing', '-1px')
//   .style('font-size', function(d) { return d.r / 2.3 })
//   .text(function(d) { return d.value; });

node.on("mouseover", function(d) {      
    tooltip.transition()        
      .duration(200)      
      .style("opacity", .9);      
    tooltip.select('.title').text(d.text);
    tooltip.select('.description').text(d.value);
    tooltip.style("left", (d3.event.pageX) + "px");     
    tooltip.style("top", (d3.event.pageY - 28) + "px");    
});

node.on("mouseout", function(d) {       
    tooltip.transition()        
      .duration(500)      
      .style("opacity", 0);   
});
