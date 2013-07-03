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
  
	well.set('bFactorGas', parseFloat(this.value);
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

/*Set Click Events 
=========================================================
*/

$('#useDefault').click(function() {
	console.log("useDefault click event handler fired");
	//Create New Well Instaance
	var well = new Well()
  	for (var t=0; t<parseFloat(well.econLife)*12; t++){
  		// console.log("in for loop");
  		var oilProd = hyperbolicMonthlySpotRate (well.initOilProduction, well.initOilDecline, well.bFactorOil, t);
  		var cumOil = hyperbolicCumMonthProduction(well.initOilProduction, well.initOilDecline, well.bFactorOil, t);
  		var gasProd = hyperbolicMonthlySpotRate (well.initGasProduction, well.initGasDecline, well.bFactorGas, t);
  		var cumGas = hyperbolicCumMonthProduction(well.initGasProduction, well.initGasDecline, well.bFactorGas, t);
  		well.set('production_oil', oilProd);
  		well.set('production_cumOil',cumOil);
  		well.set('production_gas', gasProd);
  		well.set('production_cumGas', cumGas);
  		well.set('production_month', t);
 
  	}
  console.log("wellDefault Production = " + well.get('production_oil');
  drawGraph(wellDefault.production);
  populateProdTable(well);
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