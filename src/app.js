var linearScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 600])
    .clamp(true);

// console.log(linearScale(0));
// console.log(linearScale(50));
// console.log(linearScale(150));
// console.log(linearScale.invert(300));


var timeScale = d3.scaleTime()
    .domain([new Date(2016, 0, 1), new Date()])
    .range([0, 100]);

// console.log(timeScale(new Date(2016, 3, 15)));
// console.log(timeScale.invert(50));