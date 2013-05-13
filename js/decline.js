/*Functions for decline calculations
Walt Nixon
May 2013
*/

var wellDefault = {
  	"initGasProduction": "",
	"initOilProduction": "",
	"initWaterProduction": "",
	"bFactorOil": "",
	"bFactorGas": "",
	"bFactorWater": "",
	"initGasDecline": "",
	"initOilDecline": "",
	"initWaterDecline": "",
	"timeT": "",
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
	"oilProductionAtTimeT": "",
	"gasProductionAtTimeT": "",
	"waterProductionAtTimeT": "",
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
q=qi*(1+b*Di*t)^(-1/b)
when b= 0 the equation will become for exponential decline curve but how we can derive exponential equation from hyperbolic???? we can not substitute b=0 because we have (1/b) could you plz help me???
equation of exponential is q=qi*exp(-D*t)
*/
function hyperDecline (initProduction, initDecline, bFactor, timeFromStart) {
	var q = 0;
	var qi = initProduction;
	var Di = initDecline;
	var b = bFactor;
	var tempStep = (1+b*Di*timeFromStart);
	var q = Math.pow((qi * tempStep), (-1.0/b));
	console.log("q set = " + q);
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
  
	wellUser.initOilProduction = parseFloat(this.value);
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



