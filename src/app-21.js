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


d3.json('./data/data-20.json', (err, data) => {
    const parseTime = d3.timeParse('%Y/%m/%d');

    data.forEach(company => {
        company.values.forEach(d => {
            d.date = parseTime(d.date);
            d.close = +d.close;
        })
    });

    let xScale = d3.scaleTime()
        .domain([
            d3.min(data, company => d3.min(company.values, d => d.date)),
            d3.max(data, company => d3.max(company.values, d => d.date)),
        ])
        .range([0, width]);

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(5));

    let yScale = d3.scaleLinear()
        .domain([
            d3.min(data, company => d3.min(company.values, d => d.close)),
            d3.max(data, company => d3.max(company.values, d => d.close)),
        ])
        .range([height, 0]);

    svg
        .append('g')
        .call(d3.axisLeft(yScale));

    let area = d3.area()
        .x(d => xScale(d.date))
        .y0(yScale(yScale.domain()[0]))
        .y1(d => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.5));

    svg.selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .classed('area', true)
        .attr('d', d => area(d.values))
        .style('stroke', (d, i) => ['#14e', '#df5'][i])
        .style('fill', (d, i) => ['#14e', '#df5'][i])
        .style('stroke-width', 2)
        .style('fill-opacity', .5);

    //
    // let line = d3.line()
    //     .x(d => xScale(d.date))
    //     .y(d => yScale(d.close))
    //     .curve(d3.curveCatmullRom.alpha(0.5));
    //
    // svg.selectAll('.line')
    //     .data(data)
    //     .enter()
    //     .append('path')
    //     .classed('line', true)
    //     .attr('d', d => line(d.values))
    //     .style('stroke', (d, i) => ['#fa3', '#96b'][i])
    //     .style('stroke-width', 2)
    //     .style('fill', 'none');

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