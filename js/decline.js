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
	"initOilProduction": "200.0",
	"initWaterProduction": "500.0",
	"bFactorOil": "1.2",
	"bFactorGas": "1.2",
	"bFactorWater": "1.0",
	"initGasDecline": "90",
	"initOilDecline": "70",
	"initWaterDecline": "90",
	"timeStart": "",
	"econLife": "10",
	"price": 
		{		
			"oil": "89.00",
			"gas": "3.00"
		},
	"cost":
		{
			"drillAndComplete": "1000000.0",
			"loe": "5000.0",
			"taxes": "8.0"
		},
	"production": 
		{
			"oil": [],
			"cumOil": [],
			"gas": [],
			"cumGas": [],
			"water": [],
			"cumWater": [],
			"month":[]

		},
	"revenue": 
		{
			"oil": [],
			"gas": [],
			"water": [],
			"month":[], 
			"netCashFlow": []
		}
	
}

var wellUser = {
 	"initGasProduction": "1000.0",
	"initOilProduction": "200.0",
	"initWaterProduction": "500.0",
	"bFactorOil": "1.2",
	"bFactorGas": "1.2",
	"bFactorWater": "1.0",
	"initGasDecline": "90",
	"initOilDecline": "70",
	"initWaterDecline": "90",
	"timeStart": "",
	"econLife": "10",
	"price": 
		{		
			"oil": "89.00",
			"gas": "3.00"
		},
	"cost":
		{
			"drillAndComplete": "1000000.0",
			"loe": "5000.0",
			"taxes": "8.0"
		},
	"production": 
		{
			"oil": [],
			"cumOil": [],
			"gas": [],
			"cumGas": [],
			"water": [],
			"cumWater": [],
			"month":[]

		},
	"revenue": 
		{
			"oil": [],
			"gas": [],
			"water": [],
			"month":[], 
			"netCashFlow": []
		}
	
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
	var denominator = (1+b*Di*timeFromStart);
	var inverseB = 1.0/b;
	var q = qi / Math.pow(denominator, inverseB);
	return q;
}

function hyperCumulative(initProduction, initDecline, currProd, bFactor) {
	var qCum = 0;
	var qt = currProd;
	var qi = initProduction;
	var Di = initDecline/1200.0;
	var b = bFactor;
	var group1 = ((1-b)*Di);
	var group2 = (qt/qi);
	var group3 = (1-b);
	var qCum = (qi / group1) * (1 - (Math.pow(group2, group3)));
	return qCum;	
}

function calcPriceStrip(yearPrices, months) {
	var strip = [];
	var year = 0;
	for (var i=0; i<months.length; i++){
		while (year <= months.length) {
			if (months[i] % 12 == 0){
			year++;
			}
		}
		strip.push(yearPrices[year]);	
	}
	return strip;
}

function dcf(cashFlow, discountRate, intRate, timeInYears){
	var dcf = 0;
	for (var i=0; i<cashFlow.length; i++){
		var temp = cashFlow / Math.pow((1+intRate), i+1);
		dcf += temp;
	}

	var fv = dcf * Math.pow((1+intRate), timeInYears); 
	var dpv = fv * Math.pow((1-discountRate), timeInYears);
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
  
	wellUser.price.oil = parseFloat(this.value);
  	console.log("price.oil set = " + wellUser.price.oil.toString() + " : Type = " + typeof wellUser.price.oil);

});
$('#gasPrice').change(function() {
  
	wellUser.price.gas = parseFloat(this.value);
  	console.log("price.gas set = " + wellUser.price.gas.toString() + " : Type = " + typeof wellUser.price.gas);

});
$('#loeCost').change(function() {
  
	wellUser.cost.loe = parseFloat(this.value);
  	console.log("cost.loe set = " + wellUser.cost.loe.toString() + " : Type = " + typeof wellUser.cost.loe);

});
$('#drillAndCompleteCost').change(function() {
  
	wellUser.cost.drillAndComplete = parseFloat(this.value);
  	console.log("cost.drillAndComplete set = " + wellUser.cost.drillAndComplete.toString() + " : Type = " + typeof wellUser.cost.drillAndComplete);

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
  		var cumOil = hyperCumulative(wellDefault.initOilProduction*30,
  			wellDefault.initOilDecline,
  			oilProd*30,
  			wellDefault.bFactorOil);
  		var gasProd = hyperDecline(wellDefault.initGasProduction,
  			wellDefault.initGasDecline,
  			wellDefault.bFactorGas,
  			t);
  		var cumGas = hyperCumulative(wellDefault.initGasProduction*30,
  			wellDefault.initGasDecline,
  			gasProd*30,
  			wellDefault.bFactorGas);
  		wellDefault.production.oil.push(oilProd);
  		wellDefault.production.cumOil.push(cumOil);
  		wellDefault.production.gas.push(gasProd);
  		wellDefault.production.cumGas.push(cumGas);
  		wellDefault.production.month.push(t);
 
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
  		var cumOil = hyperCumulative(wellUser.initOilProduction*30,
  			wellUser.initOilDecline,
  			oilProd*30,
  			wellUser.bFactorOil);
  	  	var gasProd = hyperDecline(wellUser.initGasProduction,
  			wellUser.initGasDecline,
  			wellUser.bFactorGas,
  			t);
  		var cumGas = hyperCumulative(wellUser.initGasProduction*30,
  			wellUser.initGasDecline,
  			gasProd*30,
  			wellUser.bFactorGas);
  		wellUser.production.oil.push(oilProd);
  		wellUser.production.cumOil.push(cumOil);
  	  	wellUser.production.gas.push(gasProd);
  		wellUser.production.cumGas.push(cumGas);
  		wellUser.production.month.push(t);
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
	well.production.oil = [];
	well.production.cumOil = [];
	well.production.gas = [];
	well.production.cumGas = [];
	well.production.water = [];
	well.production.cumWater = [];
	well.production.month = [];
}

function drawGraph (production) { 
	console.log("svg.ProdSvg Length = " + $('svg.prodSvg').length)
	console.log("production.month in graphGraph() = " + production.month);
	console.log("production.month in graphGraph() = " + production.oil);
	console.log("production graphGraph() = " + production);
	if ($('svg.prodSvg').length > 0) {
		$('svg.prodSvg').remove();
		}
	var margin = {top: 40, right:100, bottom:20, left:50},
		height = 300 - margin.left - margin.right,
		width = $("#graph").width() - margin.top - margin.bottom;
	
	var data = [];
	for (var i=0; i < d3.max(production.month); i++){
		data.push([production.month[i], production.oil[i]]);
	}
	console.log(data);
	console.log(d3.max(production.oil));
	console.log(d3.max(production.month));

	var parseDate = d3.time.format("%Y%m%d").parse;

	var x = d3.scale.linear().
		domain([0, d3.max(production.month)]). // your data minimum and maximum
		range([0, width]); // the pixels to map to, e.g., the width of the diagram.

	var y = d3.scale.log()
		.domain([1, d3.max(production.oil)*10.0])
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
	    .data(data)
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
	console.log("well.cost.loe = " + well.cost.loe);
	console.log("well = " + well);
	var ndcf = 0;
	for(var i = 0; i < well.production.month.length; i++) {
        /*var year = function () {
        	if ((well.production.month[i]+1)/12.0 <= 1) {return 1;}
        	else { return Math.floor((well.production.month[i]+1)/12.0)+1;}
        } //BROKEN */
        var year = Math.round(well.production.month[i]/12.0*10)/10;
        var months = well.production.month[i];
        var spotOil = Math.round(well.production.oil[i]*100)/100;
        var cOil = Math.round(well.production.cumOil[i]*100)/100;
        var spotGas = Math.round(well.production.gas[i]*100)/100;
        var cGas = Math.round(well.production.cumGas[i]*100)/100;
        var oilP = well.price.oil;
        var gasP = well.price.gas;
        var oilRev = Math.round((well.production.cumOil[i]-well.production.cumOil[i-1])*well.price.oil*100)/100;
        var gasRev = Math.round((well.production.cumGas[i]-well.production.cumGas[i-1])*well.price.gas*100)/100;
        var combRev = Math.round((((well.production.cumOil[i]-well.production.cumOil[i-1])*well.price.oil)+((well.production.cumGas[i]-well.production.cumGas[i-1])*well.price.gas))*100)/100;
        var mCost = Math.round(well.cost.loe*100)/100;
        var dcCost = Math.round(well.cost.drillAndComplete*100)/100.;
        var tax = Math.round(((well.cost.taxes/100.0) * combRev)*100)/100;
        var udcf = Math.round((combRev - mCost - tax)*100)/100;
        if (i == 0) {ndcf = -Math.round(dcCost*100)/100;}
        else{ndcf += Math.round((combRev - mCost - tax)*100)/100;}

        html += '<tr><td>' + year + '</td><td>' + months + '</td><td>' + spotOil + '</td><td>' + cOil + '</td><td>' + spotGas + '</td><td>' + cGas + '</td><td>' + oilP + '</td><td>' + gasP + '</td><td>' + oilRev + '</td><td>' + gasRev + '</td><td>' + combRev + '</td><td>' + mCost + '</td><td>' + dcCost +'</td><td>' + tax + '</td><td>' + udcf + '</td><td>' + ndcf + '</td></tr>';

		}    
		   
	$('#prodTable tbody tr').first().after(html);

}