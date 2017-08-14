const margin = {top: 10, right: 20, bottom: 60, left: 30};
const fullWidth = 400;
const fullHeight = 600;
const width = fullWidth - margin.left - margin.right;
const height = fullHeight - margin.top - margin.bottom;
let svg = d3.select('.chart')
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);


const data = d3.json('./data/data-19.json', (err, data) => {
    console.log(data);
    let yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.expectancy))
        .range([height, 0])
        .nice();

    let yAxis = d3.axisLeft(yScale);
    svg.call(yAxis);

    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.cost))
        .range([0, width]);

    let xAxis = d3.axisBottom(xScale).ticks(5);
    svg
        .append('g')
            .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    let rScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.population)])
        .range([0, 40]);

    let balls = svg.selectAll('.ball')
        .data(data)
        .enter()
        .append('g')
            .classed('ball', true)
            .attr('transform', d => `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`);

    balls.append('circle')
        .attr('r', d => rScale(d.population))
        .style('fill-opacity', '0.5')
        .style('fill', 'steelblue');

    balls.append('text')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('y', 4)
        .text(d => d.code);

});
function responsivefy(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}