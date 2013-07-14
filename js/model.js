
// Well Model
//

var Well = Backbone.Model.extend({
	 	defaults: {
	 		id: 0,
	 		wellName: "Default",
	 		initGasProduction: 1000.0,
			initOilProduction: 200.0,
			initWaterProduction: 500.0,
			bFactorOil: 1.2,
			bFactorGas: 1.2,
			bFactorWater: 1.0,
			initGasDecline: 90,
			initOilDecline: 70,
			initWaterDecline: 90,
			timeStart: "",
			econLife: 10,
			price_oil: 89.00,
			price_gas: 3.00,
			cost_drillAndComplete: 1000000.0,
			cost_loe: 5000.0,
			cost_taxes: 8.0,
			production_oil: [],
			production_cumOil: [],
			production_gas: [],
			production_cumGas: [],
			production_water: [],
			production_cumWater: [],
			production_month:[],
			revenue_oil: [],
			revenue_gas: [],
			revenue_water: [],
			revenue_month:[], 
			revenue_netCashFlow: []
		}, //end defaults

		validate: function(attribs){
			if(attribs.bFactorOil == "0"){
				return "This calculator does not currently handle the special case of Harmoic Decline (b=0)";
			}
		}, //End validate

		initialize: function(){

			if (this.get("id") == 0 || !this.get("id")){
				this.set({"id": this.newId()});
			}

			console.log("New Well Initialized id = " + this.get("id"));

			this.on('change', function(){
				console.log("- Values for this model have changed");
			});
			this.on('invalid', function(model, error){
				console.log(error);
			})
		},//End initialize
		newId: function() {
			return Wells.max().get('id') +1;
		} //End newId
	}); //End Well Model

// Well Collection
// --------------------

var WellList = Backbone.Collection.extend({
	model: Well,

	localStorage: new Backbone.LocalStorage("wells-backbone")

});

