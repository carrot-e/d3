const data = [
    {score: 63, subject: 'Mathematics'},
    {score: 82, subject: 'Geography'},
    {score: 74, subject: 'Spelling'},
    {score: 97, subject: 'Reading'},
    {score: 52, subject: 'Science'},
    {score: 74, subject: 'Chemistry'},
    {score: 97, subject: 'Physics'},
    {score: 52, subject: 'ASL'}
];

const margin = {top: 10, right: 20, bottom: 60, left: 30};
const fullWidth = 400;
const fullHeight = 600;
const width = fullWidth - margin.left - margin.right;
const height = fullHeight - margin.top - margin.bottom;
let svg = d3.select('.chart')
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        // .attr('viewBox', `0 0 ${fullWidth * 2} ${fullHeight * 2}`)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

let yAxis = d3.axisLeft(yScale)
    .ticks(5);
svg.call(yAxis);

let xScale = d3.scaleBand()
    .paddingInner(.2)
    .paddingOuter(.5)
    .domain(data.map(i => i.subject))
    .range([0, width]);

let xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeMinute.every(45))
    .tickSizeInner(10)
    .tickSizeOuter(20)
    .tickPadding(10);

svg
    .append('g')
        .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('text')
    .attr('text-anchor', 'end')
    .attr('transform', 'rotate(-45)');

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
        .attr('x', d => xScale(d.subject))
        .attr('y', d => yScale(d.score))
        .attr('width', d => xScale.bandwidth())
        .attr('height', d => height - yScale(d.score));

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