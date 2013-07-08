/*Functions for decline calculations
Walt Nixon
May 2013
*/



/*Set Values on Input Change Events
=========================================================
*/
$('#initOilProduction').change(function() {
  
	well.set('initOilProduction', parseFloat(this.value));
  	console.log("initOilProduction set = " + well.get('initOilProduction') + " : Type = " + typeof well.get('initOilProduction'));

});

$('#initOilDecline').change(function() {
  
	well.set('initOilDecline', parseFloat(this.value));
  	console.log("initOilDecline set = " + well.get('initOilDecline') + " : Type = " + typeof well.get('initOilDecline'));

});
$('#bFactorOil').change(function() {
  
	well.set('bFactorOil', parseFloat(this.value));
  	console.log("bFactorOil set = " + well.get('bFactorOil') + " : Type = " + typeof well.get('bFactorOil'));

});
$('#initGasProduction').change(function() {
  
	well.set('initGasProduction', parseFloat(this.value));
  	console.log("initGasProduction set = " + well.get('initGasProduction') + " : Type = " + typeof well.get('initGasProduction'));

});
$('#initGasDecline').change(function() {
  
	well.set('initGasDecline', parseFloat(this.value));
  	console.log("initGasDecline set = " + well.get('initGasDecline') + " : Type = " + typeof well.get('initGasDecline'));

});
$('#bFactorGas').change(function() {
  
	well.set('bFactorGas', parseFloat(this.value));
  	console.log("bFactorGas set = " + well.get('bFactorGas') + " : Type = " + typeof well.get('bFactorGas'));

});
$('#initWaterProduction').change(function() {  

	well.set('initWaterProduction', parseFloat(this.value));
  	console.log("initWaterProduction set = " + well.get('initWaterProduction') + " : Type = " + typeof well.get('initWaterProduction'));

});
$('#initWaterDecline').change(function() {
  
	well.set('initWaterDecline', parseFloat(this.value));
  	console.log("initWaterDecline set = " + well.get('initWaterDecline') + " : Type = " + typeof well.get('initWaterDecline'));

});
$('#bFactorWater').change(function() {
  
	well.get('bFactorWater', parseFloat(this.value));
  	console.log("bFactorWater set = " + well.get('bFactorWater') + " : Type = " + typeof well.get('bFactorWater'));

});
$('#econLife').change(function() {
  
	well.set('econLife', parseFloat(this.value));
  	console.log("econLife set = " + well.set('econLife') + " : Type = " + typeof well.set('econLife'));

});
$('#oilPrice').change(function() {
  
	well.set('price_oil', parseFloat(this.value));
  	console.log("price_oil set = " + well.get('price_oil') + " : Type = " + typeof well.get('price_oil'));

});
$('#gasPrice').change(function() {
  
	well.set('price_gas', parseFloat(this.value));
  	console.log("price_gas set = " + well.get('price_gas') + " : Type = " + typeof well.get('price_gas'));

});
$('#loeCost').change(function() {
  
	well.set('cost_loe', parseFloat(this.value));
  	console.log("cost.loe set = " + well.get('cost_loe') + " : Type = " + typeof well.get('cost_loe'));

});
$('#drillAndCompleteCost').change(function() {
  
	well.set('cost_drillAndComplete', parseFloat(this.value));
  	console.log("cost.drillAndComplete set = " + well.get('cost_drillAndComplete') + " : Type = " + typeof well.get('cost_drillAndComplete'));

});


function produce(well) {
  	console.log("useDefault click event handler fired");

	//wellReset(well);
	var oilProd = [];
	var cumOil = [];
	var gasProd = [];
	var cumGas = [];
	var waterProd = [];
	var cumWater = [];
	var time = [];
	console.log("econLife = " + well.get('econLife'));
  	for (var t=0; t<well.get('econLife')*12; t++){
  		// console.log("==================");
  		// console.log("initOilProduction = " + well.get('initOilProduction'));
  		// console.log("initOilDecline = " + well.get('initOilDecline'));
  		// console.log("bFactorOil = " + well.get('bFactorOil'));
  		// console.log("time = " + t);
  		oilProd.push(hyperbolicMonthlySpotRate (well.get('initOilProduction'), well.get('initOilDecline')/100, well.get('bFactorOil'), t));
  		cumOil.push(hyperbolicCumProduction(well.get('initOilProduction'), well.get('initOilDecline')/100, well.get('bFactorOil'), t));
  		gasProd.push(hyperbolicMonthlySpotRate (well.get('initGasProduction'), well.get('initGasDecline')/100, well.get('bFactorGas'), t));
  		cumGas.push(hyperbolicCumProduction(well.get('initGasProduction'), well.get('initGasDecline')/100, well.get('bFactorGas'), t));
  		waterProd.push(hyperbolicMonthlySpotRate (well.get('initWaterProduction'), well.get('initWaterDecline')/100, well.get('bFactorWater'), t));
  		cumWater.push(hyperbolicCumProduction(well.get('initWaterProduction'), well.get('initWaterDecline')/100, well.get('bFactorWater'), t));
  		time.push(t);
  	}
	well.set('production_oil', oilProd);
	well.set('production_cumOil',cumOil);
	well.set('production_gas', gasProd);
	well.set('production_cumGas', cumGas);
	well.set('production_water', waterProd);
	well.set('production_cumWater', cumWater);
	well.set('production_month', time);
	console.log("well Spot Oil Production = " + well.get('production_oil'));
  	console.log("well Cum Oil Production = " + well.get('production_cumOil'));
  	console.log("well Spot Gas Production = " + well.get('production_gas'));
  	console.log("well Cum Gas Production = " + well.get('production_cumGas'));
  	console.log("well Month  = " + well.get('production_month'));
  	drawGraph(well.get('production_oil'), well.get('production_month'));
  	populateProdTable(well);
  	return false;
}
/*Set Click Events 
=========================================================
*/

$('#useDefault').click(function(){
	//Create New Well Instaance
	var well = new Well();
	produce(well);
});


$('#processData').click(function() {
	//Create New Well Instaance
	var well = new Well();
	produce(well);
	produce();
});


function wellReset(well){
	well.production_oil = [];
	well.production_cumOil = [];
	well.production_gas = [];
	well.production_cumGas = [];
	well.production_water = [];
	well.production_cumWater = [];
	well.production_month = [];
}

/*Populate Detail Table 
=========================================================
*/

function populateProdTable(well) {
	$('#prodTable tbody tr').not(':first').not(':last').remove();
	var html = '';
	console.log("well_cost_loe = " + well.get('cost_loe'));
	console.log("well = " + well.toJSON());
	var ndcf = 0;
	// var cOil = 0;
	// var cGas = 0;
	for(var i = 0; i < well.get('production_month').length; i++) {
        /*var year = function () {
        	if ((well.production.month[i]+1)/12.0 <= 1) {return 1;}
        	else { return Math.floor((well.production.month[i]+1)/12.0)+1;}
        } //BROKEN */
        var year = Math.round(well.get('production_month')[i]/12.0*10)/10;
        var months = well.get('production_month')[i];
        var spotOil = Math.round(well.get('production_oil')[i]*100)/100;
        var cOil = Math.round(well.get('production_cumOil')[i]*100)/100;
        var spotGas = Math.round(well.get('production_gas')[i]*100)/100;
        var cGas = Math.round(well.get('production_cumGas')[i]*100)/100;
        var oilP = well.get('price_oil');
        var gasP = well.get('price_gas');
        var oilRev = Math.round(
        	(well.get('production_cumOil')[i]
        		-well.get('production_cumOil')[i-1])
        	*well.get('price_oil')
        	*100)/100;
        var gasRev = Math.round((well.get('production_cumGas')[i]-well.get('production_cumGas')[i-1])*well.get('price_gas')*100)/100;
        var combRev = Math.round((oilRev+gasRev)*100)/100;
        var mCost = Math.round(well.get('cost_loe')*100)/100;
        var dcCost = Math.round(well.get('cost_drillAndComplete')*100)/100.;
        var tax = Math.round(((well.get('cost_taxes')/100.0) * combRev)*100)/100;
        var udcf = Math.round((combRev - mCost - tax)*100)/100;
        if (i == 0) {ndcf = -Math.round(dcCost*100)/100;}
        else{ndcf += Math.round((combRev - mCost - tax)*100)/100;}

        html += '<tr><td>' + year + '</td><td>' + months + '</td><td>' + spotOil + '</td><td>' + cOil + '</td><td>' + spotGas + '</td><td>' + cGas + '</td><td>' + oilP + '</td><td>' + gasP + '</td><td>' + oilRev + '</td><td>' + gasRev + '</td><td>' + combRev + '</td><td>' + mCost + '</td><td>' + dcCost +'</td><td>' + tax + '</td><td>' + udcf + '</td><td>' + ndcf + '</td></tr>';

		}    
		   
	$('#prodTable tbody tr').first().after(html);

}

/*D3 Graph Area 
=========================================================
*/
function drawGraph (production, time) { 
	console.log("svg.ProdSvg Length = " + $('svg.prodSvg').length)
	console.log("production time in graphGraph() = " + time);
	console.log("production values in graphGraph() = " + production);
	if ($('svg.prodSvg').length > 0) {
		$('svg.prodSvg').remove();
		}
	var margin = {top: 40, right:100, bottom:20, left:50},
		height = 300 - margin.left - margin.right,
		width = $("#graph").width() - margin.top - margin.bottom;
	
	var data = [];
	for (var i=0; i < d3.max(time); i++){
		data.push([time[i], production[i]]);
	}
	console.log(data);
	console.log(d3.max(production));
	console.log(d3.max(time));

	var parseDate = d3.time.format("%Y%m%d").parse;

	var x = d3.scale.linear().
		domain([0, d3.max(production)]). // your data minimum and maximum
		range([0, width]); // the pixels to map to, e.g., the width of the diagram.

	var y = d3.scale.log()
		.domain([1, d3.max(production)*10.0])
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

