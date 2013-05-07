/*Functions for decline calculations
Walt Nixon
May 2013
*/

$('#oilTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})
$('#gasTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})
$('#waterTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})


var well = {
  	"initGasProduction": "",
	"initOilProduction": "",
	"initWaterProduction": "",
	"bFactorOil": "",
	"bFactorGas": "",
	"bFactorWater": "",
	"initGasDecline": "",
	"initOilDecline": "",
	"initWaterDecline": ""
}
