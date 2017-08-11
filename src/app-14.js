const scores = [
    { name: 'Alice', score: 96 },
    { name: 'Billy', score: 83 },
    { name: 'Cindy', score: 91 },
    { name: 'David', score: 96 },
    { name: 'Emily', score: 88 }
];

const setScale = (selection, scale) => {
    selection.style('transform', `scaleX(${scale})`);
};
const setOpacity = (selection, opacity) => {
    selection.style('fill-opacity', opacity);
};

let bar = d3.select('.chart')
    .append('svg')
        .attr('width', 225)
        .attr('height', 300)
    .selectAll('g')
    .data(scores)
    .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * 33})`);

bar.append('rect')
    .style('width', d => d.score)
    .classed('bar', true)
    .on('mouseover', function(d, i, elements) {
        d3.select(this).call(setScale, 2);
        d3.selectAll(elements)
            .filter(':not(:hover)')
            .call(setOpacity, 0.5);
    })
    .on('mouseout', function(d, i, elements) {
        d3.select(this).call(setScale, 1);
        d3.selectAll(elements)
            .call(setOpacity, 1);
    });

bar.append('text')
    .attr('y', 20)
    .text(d => d.name);
