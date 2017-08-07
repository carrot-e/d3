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