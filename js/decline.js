/*Functions for decline calculations
Walt Nixon
May 2013
*/

/*JSON Definitions
=========================================================
*/
var global = {
	"useDefault": "",
	"econLife": "",
	"prodOil": []
}

var wellDefault = {
  	"initGasProduction": "1000.0",
	"initOilProduction": "100.0",
	"initWaterProduction": "500.0",
	"bFactorOil": "1.0",
	"bFactorGas": "1.0",
	"bFactorWater": "1.0",
	"initGasDecline": "90",
	"initOilDecline": "80",
	"initWaterDecline": "90",
	"timeStart": "",
	"econLife": "10",
	"afeCost": "1000000.0",
	"loeCost": "5000.0",
	"production": [
		{
			"oil": "",
			"gas": "",
			"water": "",
			"timeSinceStart":""
		}],
	"revenue": [
		{
			"oil": "",
			"gas": "",
			"water": "",
			"timeSinceStart":""
		}
	]
}

var wellUser = {
  	"initGasProduction": "",
	"initOilProduction": "",
	"initWaterProduction": "",
	"bFactorOil": "",
	"bFactorGas": "",
	"bFactorWater": "",
	"initGasDecline": "",
	"initOilDecline": "",
	"initWaterDecline": "",
	"timeStart": "",
	"econLife": "",
	"afeCost": "1000000.0",
	"loeCost": "5000.0",
	"production": [
		{
			"oil": "",
			"gas": "",
			"water": "",
			"timeSinceStart":""

		}],
	"revenue": [
		{
			"oil": "",
			"gas": "",
			"water": "",
			"timeSinceStart":""
		}
	]
}
/*Function Definitinos
=========================================================
 hyperbolic decline q=qi*(1+b*Di*t)^(-1/b) when b= 0 the equation will become for exponential decline curve 
 exponential decline q=qi*exp(-D*t)
*/
function hyperDecline (initProduction, initDecline, bFactor, timeFromStart) {
	var q = 0;
	var qi = initProduction;
	var Di = initDecline;
	var b = bFactor;
	var tempStep = (1+b*Di*timeFromStart);
	var q = Math.pow((qi / tempStep), (1.0/b));
	/*console.log("q set = " + q);*/
	return q;
}

function processOil (time) {
	// console.log("In processOil function");
	var ip, Di, b;
	if (global.useDefault == "true"){
		console.log("use default == true");
  		global.econLife = wellDefault.econLife;
  		ip = wellDefault.initOilProduction;
  		Di = wellDefault.initOilDecline/100.0;
  		b = wellDefault.bFactorOil;
  	}
  	else {
  		console.log("use default == false");
  		global.econLife = wellUser.econLife;
  		ip = wellUser.initOilProduction;
  		Di = wellUser.initOilDecline/100.0;
  		b = wellUser.bFactorOil;
  	}
  	return [time, hyperDecline(ip, Di, b, time)];
}


/*Set Values on Input Change Events
=========================================================
*/
$('#initOilProduction').change(function() {
  
	wellUser.initOilProduction = parseFloat(this.value);
  	console.log("initOilProduction set = " + wellUser.initOilProduction.toString() + " : Type = " + typeof wellUser.initOilProduction);

});

$('#initOilDecline').change(function() {
  
	wellUser.initOilDecline = parseFloat(this.value);
  	console.log("initOilDecline set = " + wellUser.initOilDecline.toString() + " : Type = " + typeof wellUser.initOilDecline);

});
$('#bFactorOil').change(function() {
  
	wellUser.bFactorOil = parseFloat(this.value);
  	console.log("bFactorOil set = " + wellUser.bFactorOil.toString() + " : Type = " + typeof wellUser.bFactorOil);

});
$('#initGasProduction').change(function() {
  
	wellUser.initGasProduction = parseFloat(this.value);
  	console.log("initGasProduction set = " + wellUser.initGasProduction.toString() + " : Type = " + typeof wellUser.initGasProduction);

});
$('#initGasDecline').change(function() {
  
	wellUser.initGasDecline = parseFloat(this.value);
  	console.log("initGasDecline set = " + wellUser.initGasDecline.toString() + " : Type = " + typeof wellUser.initGasDecline);

});
$('#bFactorGas').change(function() {
  
	wellUser.bFactorGas = parseFloat(this.value);
  	console.log("bFactorGas set = " + wellUser.bFactorGas.toString() + " : Type = " + typeof wellUser.bFactorGas);

});
$('#initWaterProduction').change(function() {  
	wellUser.initWaterProduction = parseFloat(this.value);
  	console.log("initWaterProduction set = " + wellUser.initWaterProduction.toString() + " : Type = " + typeof wellUser.initWaterProduction);
});
$('#initWaterDecline').change(function() {
  
	wellUser.initWaterDecline = parseFloat(this.value);
  	console.log("initWaterDecline set = " + wellUser.initWaterDecline.toString() + " : Type = " + typeof wellUser.initWaterDecline);

});
$('#bFactorWater').change(function() {
  
	wellUser.bFactorWater = parseFloat(this.value);
  	console.log("bFactorWater set = " + wellUser.bFactorWater.toString() + " : Type = " + typeof wellUser.bFactorWater);

});
$('#econLife').change(function() {
  
	wellUser.econLife = parseFloat(this.value);
  	console.log("econLife set = " + wellUser.econLife.toString() + " : Type = " + typeof wellUser.econLife);

});
$('#oilPrice').change(function() {
  
	wellUser.oilPrice = parseFloat(this.value);
  	console.log("oilPrice set = " + wellUser.oilPrice.toString() + " : Type = " + typeof wellUser.oilPrice);

});
$('#gasPrice').change(function() {
  
	wellUser.gasPrice = parseFloat(this.value);
  	console.log("gasPrice set = " + wellUser.gasPrice.toString() + " : Type = " + typeof wellUser.gasPrice);

});
$('#loeCost').change(function() {
  
	wellUser.loeCost = parseFloat(this.value);
  	console.log("loeCost set = " + wellUser.loeCost.toString() + " : Type = " + typeof wellUser.loeCost);

});
$('#afeCost').change(function() {
  
	wellUser.afeCost = parseFloat(this.value);
  	console.log("afeCost set = " + wellUser.afeCost.toString() + " : Type = " + typeof wellUser.afeCost);

});

/*Set Click Events 
=========================================================
*/

$('#useDefault').click(function() {
	console.log("useDefault click event handler fired");
	global.useDefault = "true";
	global.econLife = wellDefault.econLife;
	console.log("global.useDefault set = " + global.useDefault);
	console.log("global.econLife set = " + global.econLife);
});



$('#processData').click(function() {
	console.log("processData click handler fired");
	console.log("global.econLife" + global.econLife);
	console.log("parseFloat(global.econLife) " + parseFloat(global.econLife));
  	for (var t=1; t<=parseFloat(global.econLife)*12; t++){
  		// console.log("in for loop");
  		oilProd = processOil(t);
  		global.prodOil.push(oilProd);
  	}
  console.log(global.prodOil);
  drawGraph();
  return false;
});

/*D3 Graph Area 
=========================================================
*/
function getMaxMonth(life) {
	return parseFloat(life)*12
}


function drawGraph () { 
	var margin = {top: 20, right:20, bottom:20, left:50},
		height = 250 - margin.left - margin.right,
		width = 400 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%Y%m%d").parse;

	var x = d3.scale.linear().
		domain([0, getMaxMonth(global.econLife)]). // your data minimum and maximum
		range([0, width]); // the pixels to map to, e.g., the width of the diagram.


	//console.log(d3.max(global.oilProd, function(d) { return d; }));

	var y = d3.scale.linear()
		.domain([0, 120])
		.range([height, 0]);

	var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

	var svg = d3.select("#graph")
	    .append("svg")
	    .data(global.econLife)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");  

	svg.append("g")
		.attr("class", "axis")
	    .call(yAxis);

	svg.append("g")
		.attr("class", "axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	var line = d3.svg.line()
		.x(function(d) { return x(d[0]); })
		.y(function(d) { return y(d[1]); });

	svg.append("svg:path")
		.attr("d", line(global.prodOil))
		.style("stroke", function() { return "#000000";})
		.style("fill", "none")
		.style("stroke-width", "2.5");
 
	var dataCirclesGroup = svg.append('svg:g');
 
	var circles = dataCirclesGroup.selectAll('.data-point')
		.data(global.prodOil);

	circles
			.enter()
			.append('svg:circle')
			.attr('class', 'dot')
			.attr('fill', function() { return "green"; })
			.attr('cx', function(d) { return x(d[0]); })
			.attr('cy', function(d) { return y(d[1]); })
			.attr('r', function() { return 3; })
			.on("mouseover", function(d) {
  				d3.select(this)
					.attr("r", 8)
					.attr("class", "dot-selected")
					.transition()
      					.duration(750);
			})
			.on("mouseout", function(d) {
  				d3.select(this)
					.attr("r", 3)
					.attr("class", "dot")
					.transition()
      					.duration(750);
			});

}

