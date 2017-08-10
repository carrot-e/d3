var linearScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 600])
    .clamp(true);
// console.log(linearScale(0)); // 0
// console.log(linearScale(50)); // 300
// console.log(linearScale(150)); // 600
// console.log(linearScale.invert(300)); // 50


var timeScale = d3.scaleTime()
    .domain([new Date(2016, 0, 1), new Date()])
    .range([0, 100]);
// console.log(timeScale(new Date(2016, 3, 15))); // 17.951201790839384
// console.log(timeScale.invert(50)); // Wed Oct 19 2016 09:14:39 GMT+0300 (EEST)


var quantizeScale = d3.scaleQuantize()
    .domain([0, 100])
    .range(['red', 'white', 'green']);
// console.log(quantizeScale(22)); // red
// console.log(quantizeScale(50)); // white
// console.log(quantizeScale(77)); // green
// console.log(quantizeScale.invertExtent('white')); // [33.333333333333336, 66.66666666666667]

var ordinalScale = d3.scaleOrdinal()
    .domain(['poor', 'good', 'great'])
    .range(['red', 'white', 'green']);
// console.log(ordinalScale('good')); // white

// Load and inspect data
d3.json('data/data.json', (data) => {
    // console.log(data);

    let min = d3.min(data, i => i.age);
    let max = d3.max(data, i => i.age);
    let extent = d3.extent(data, i => i.age);
    // console.log(min, max, extent);

    let scale = d3.scaleLinear()
        .domain(extent)
        .range([0, 600]);

    // gets UNIQUE values (i.e. no same values)
    let ages = d3.set(data, (i) => i.age).values();
    // console.log(ages);
});

// Select DOM Elements with D3
let container = d3.select('div.title');
let a = d3.selectAll('div a');
// console.log(container.selectAll('a').nodes());
// console.log(a.nodes());
// console.log(d3.selectAll('.action').size());