var diameter = 800;
var width = diameter;
var height = diameter / 2;

data = data.sort(function (a, b) {
    return b.value - a.value;
});

var chart = d3.select('.chart');

var bubble = d3.layout.pack()
    .size([width, height])
    .padding(10)
    .sort(function (a, b) {
        return b.value - a.value;
    });

var node = chart.selectAll(".node")
    .data(bubble.nodes({children: data}).filter(function (d) {
        return !d.children;
    }))
    .enter().append('g')
    .attr('class', 'node')
    .attr('opacity', '0')
    .attr('transform', function (d) {
        var x = width / 2
        var y = height / 2

        return "translate(" + x + "," + y + ")";
    });


node.transition()
    .duration(1000)
    .delay(function (d, i) { return i * 50 })
    .attr('opacity', '1')
    .attr('transform', function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append('circle')
    .attr('class', 'circle')
    .style('fill', 'white')
    .style('stroke', 'silver')
    .style('stroke-width', 2)
    .style('stroke-opacity', 0.5)
    .attr('r', function (d) {
        return d.r
    });

node.append('image')
    .attr('xlink:href', function (d) {
        return d.image
    })
    .attr('width', function (d) {
        return d.r * 1.2;
    })
    .attr('height', function (d) {
        return d.r * 1.2;
    })
    .attr('x', function (d) {
        return  d.r / -1.6
    })
    .attr('y', function (d) {
        return  d.r / -1.6
    });

// node.append('text')
//   .attr("class", "caption")
//   .attr("dy", "1.5em")
//   .style("text-anchor", "middle")
//   .style('fill', '#3A6EC2')
//   .style('letter-spacing', '-1px')
//   .style('font-size', function(d) { return d.r / 2.3 })
//   .text(function(d) { return d.value; });

d3.select('.page').transition()
    .duration(1000)
    .style('opacity', '1');

node.on("mouseover", function (d) {
    d3.select(this).select('circle').style('stroke', '#1076BC')
});

node.on("mouseout", function (d) {
    d3.select(this).select('circle').style('stroke', 'silver')
});
