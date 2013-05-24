/*Functions for decline calculations
Walt Nixon
May 2013
*/

/*JSON Definitions
=========================================================
*/
var global = {
	"useDefault": "",
}

var wellDefault = {
  	"initGasProduction": "1000.0",
	"initOilProduction": "100.0",
	"initWaterProduction": "500.0",
	"bFactorOil": "1.2",
	"bFactorGas": "1.0",
	"bFactorWater": "1.0",
	"initGasDecline": "90",
	"initOilDecline": "70",
	"initWaterDecline": "90",
	"timeStart": "",
	"econLife": "10",
	"afeCost": "1000000.0",
	"loeCost": "5000.0",
	"production": [
		{
			"oil": [],
			"gas": [],
			"water": [],
			"month": []
		}],
	"revenue": [
		{
			"oil": [],
			"gas": [],
			"water": [],
			"month":[]
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
			"oil": [],
			"gas": [],
			"water": [],
			"month":[]

		}],
	"revenue": [
		{
			"oil": [],
			"gas": [],
			"water": [],
			"month":[]
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
	var Di = initDecline/1200.0;
	var b = bFactor;
	var tempStep = (1+b*Di*timeFromStart);
	var inverseB = 1.0/b;
	var q = Math.pow((qi / tempStep), inverseB);
	return q;
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
	console.log("global.useDefault set = " + global.useDefault);
	wellReset(wellDefault);
  	for (var t=0; t<parseFloat(wellDefault.econLife)*12; t++){
  		// console.log("in for loop");
  		var oilProd = hyperDecline(wellDefault.initOilProduction,
  			wellDefault.initOilDecline,
  			wellDefault.bFactorOil,
  			t);
  		wellDefault.production[0].oil.push(oilProd);
  		wellDefault.production[0].month.push(t);
  	}
  console.log("wellDefault Production = " + wellDefault.production);
  drawGraph(wellDefault.production);
  populateProdTable(wellDefault);
  return false;
});


$('#processData').click(function() {
	console.log("processData click handler fired");
	wellReset(wellUser);
  	for (var t=0; t<parseFloat(wellUser.econLife)*12; t++){
  		// console.log("in for loop");
  		var oilProd = hyperDecline(wellUser.initOilProduction,
  			wellUser.initOilDecline,
  			wellUser.bFactorOil,
  			t);
  		wellUser.production[0].oil.push(oilProd);
  		wellUser.production[0].month.push(t);
  	}
  console.log("wellUser Production = " + wellUser.production);
  drawGraph(wellUser.production);
  populateProdTable(wellUser);
  return false;
});

/*D3 Graph Area 
=========================================================
*/

function wellReset(well){
	well.production[0].oil = [];
	well.production[0].month = [];
}

function drawGraph (production) { 
	console.log("svg.ProdSvg Length = " + $('svg.prodSvg').length)
	if ($('svg.prodSvg').length > 0) {
		$('svg.prodSvg').remove();
		}
	var margin = {top: 40, right:100, bottom:20, left:50},
		height = 300 - margin.left - margin.right,
		width = $("#graph").width() - margin.top - margin.bottom;
	
	var data = [];
	for (var i=0; i < d3.max(production[0].month); i++){
		data.push([production[0].month[i], production[0].oil[i]]);
	}
	console.log(data);
	console.log(d3.max(production[0].oil));
	console.log(d3.max(production[0].month));

	var parseDate = d3.time.format("%Y%m%d").parse;

	var x = d3.scale.linear().
		domain([0, d3.max(production[0].month)]). // your data minimum and maximum
		range([0, width]); // the pixels to map to, e.g., the width of the diagram.

	var y = d3.scale.log()
		.domain([1, d3.max(production[0].oil)*10.0])
		.range([height, 0]);

	var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .tickValues([1,10,100,1000,10000])
        .tickFormat(d3.format(",.0f"))
        .orient("left");

	var svg = d3.select("#graph")
	    .append("svg")
	    .attr("class", "prodSvg")
	    .data(production)
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
		.attr("d", line(data))
		.style("stroke", function() { return "#000000";})
		.style("fill", "none")
		.style("stroke-width", "2.5");
 
	var dataCirclesGroup = svg.append('svg:g');
 
	var circles = dataCirclesGroup.selectAll('.data-point')
		.data(data);

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

} //END drawGraph()


/*					      <th>Year</th>
						      <th>Month</th>
						      <th>Net Revenue ($)</th>
						      <th>Gross Revenue ($)</th>
						      <th>LOE ($)</th>
						      <th>Oil (bbls)</th>
						      <th>Oil Revenue ($)</th>
						      <th>Gas (mcf)</th>
						      <th>Gas Revenue ($)</th>
						      <th>Water (bbls)</th>*/
function populateProdTable(well) {
	$('#prodTable tbody tr').not(':first').not(':last').remove();
	var html = '';
	console.log("welL.loeCost = " + well.loeCost);
	console.log("well = " + well);
	for(var i = 0; i < well.production[0].month.length; i++) {
            html += '<tr><td>' + "" + '</td><td>' + well.production[0].month[i] + '</td><td>' + "" + '</td><td>' + "" + '</td><td>' + well.loeCost + '</td><td>' + Math.round(well.production[0].oil[i]*100)/100+ '</td><td>' + "" + '</td><td>' + "" + '</td><td>' + "" + '</td><td>' + "" + '</td></tr>';
		}    
		   
	$('#prodTable tbody tr').first().after(html);

}