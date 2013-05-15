/*Functions for decline calculations
Walt Nixon
May 2013
*/

var flag = {
	"useDefault": "false"
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
	"oilProductionAtTimeT": "",
	"gasProductionAtTimeT": "",
	"waterProductionAtTimeT": ""
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
	"production": [
		{
			"oil": "",
			"gas": "",
			"water": "",
			"timeSinceStart":""
		}
	]
}
/*
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

/*Set Values on Input Change Event*/
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

$('#useDefault').click(fuction() {
	flag.useDefault = "true";
});

var prodArray = [];
$('#processData').click(function() {
  for (var t=1; t<=wellUser.econLife*12; t++){
  	if (flag.useDefault === 'true'){
  		var oilProd = hyperDecline(wellDefault.initOilProduction, wellDefault.initOilDecline/100.0, wellDefault.bFactorOil, t);
  	}
  	else {
  		var oilProd = hyperDecline(wellUser.initOilProduction, wellUser.initOilDecline/100.0, wellUser.bFactorOil, t);
  }
  	prodArray.push(oilProd);
  }
  console.log(prodArray);
  return false;
});

