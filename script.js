var diameter = 800;
var width = diameter;
var height = diameter / 2;

var hint_height = 30;
var hint_width = 140;

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
    .delay(function (d, i) {
        return i * 50
    })
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

var hint = d3.select(".chart").append('g')
    .attr('class', 'hint')
    .style('opacity', '0');

var hint_rect = hint.append('rect')
    .attr('class', 'hint-rect')
    .attr('width', hint_width)
    .attr('height', hint_height)
    .style('fill', '#1076BC')
    .style('opacity', '0.8')
    .attr('rx', '4')
    .attr('ry', '4');

var hint_text_title = hint.append('text')
    .attr('class', 'hint-title')
    .style('fill', 'white')
    .style('font-size', '0.8em')
    .style('font-weight', 'bold')
    .attr('dy', '1em')
    .attr('dx', '4px');

var hint_text_desc = hint.append('text')
    .attr('class', 'hint-desc')
    .style('fill', 'white')
    .style('font-size', '0.7em')
    .attr('dy', '2.2em')
    .attr('dx', '4px');

d3.select('.page').transition()
    .duration(1000)
    .style('opacity', '1');

node.on("mouseover", function (d) {
    d3.select(this).select('circle').style('stroke', '#1076BC');

    hint_text_title.text(d.text);
    hint_text_desc.text(d.value + " постов");

    if (hint.dis_timeout) {
        clearTimeout(hint.dis_timeout);
        hint.dis_timeout = false;

        hint.transition()
            .duration(100)
            .style('opacity', '1')
            .attr('transform', "translate(" + (d.x + d.r + 10) + "," + (d.y - d.r) + ")")
    } else {
        hint
            .attr('transform', "translate(" + (d.x + d.r + 10) + "," + (d.y - d.r) + ")")
            .transition()
            .duration(100)
            .style('opacity', '1')

    }
    hint_rect.attr('width', Math.max(
        hint_text_title[0][0].getComputedTextLength(),
        hint_text_desc[0][0].getComputedTextLength())
        + 10
    );
});

function remove_hint() {
    if (hint.dis_timeout) return;
    hint.dis_timeout = setTimeout(function() {
        hint.transition()
            .duration(300)
            .style('opacity', '0');
        hint.dis_timeout = false;
    }, 200)
}

node.on("mouseout", function (d) {
    d3.select(this).select('circle').style('stroke', 'silver');

    remove_hint()
});

hint.on("mouseover", function(d) {
    if (hint.dis_timeout) {
        clearTimeout(hint.dis_timeout);
        hint.dis_timeout = false;
    }
});

hint.on("mouseout", function (d) {
    remove_hint();
});