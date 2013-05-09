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
	"timeT": "",
	"oilProductionAtTimeT": "",
	"gasProductionAtTimeT": "",
	"waterProductionAtTimeT": ""
}
/*
q=qi*(1+b*Di*t)^(-1/b)
when b= 0 the equation will become for exponential decline curve but how we can derive exponential equation from hyperbolic???? we can not substitute b=0 because we have (1/b) could you plz help me???
equation of exponential is q=qi*exp(-D*t)
*/

$('#initOilProduction').change(function() {
  
	wellUser.initOilProduction = this.val();
  	console.log(wellUser.initOilProduction.toString());

});

function hyperDecline (data, time) {


}



