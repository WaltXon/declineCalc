
var app = app || {};

	app.wells = [

				{id: 0, user: 'me',	wellName: "Default", initGasProduction: 1000.0, 
		 		initOilProduction: 200.0, initWaterProduction: 500.0, bFactorOil: 1.2,
				bFactorGas: 1.2, bFactorWater: 1.0, initGasDecline: 90,	initOilDecline: 70,
				initWaterDecline: 90, timeStart: "", econLife: 10, price_oil: 89.00,
				price_gas: 3.00, cost_drillAndComplete: 1000000.0, cost_loe: 5000.0, cost_taxes: 8.0,
				production_oil: [],	production_cumOil: [], production_gas: [], production_cumGas: [],
				production_water: [], production_cumWater: [], production_month:[], revenue_oil: [],
				revenue_gas: [], revenue_water: [], revenue_month:[], revenue_netCashFlow: []
				}, 
				
				{id: 1, user: 'me',	wellName: "Waldo", initGasProduction: 1000.0, 
		 		initOilProduction: 200.0, initWaterProduction: 500.0, bFactorOil: 1.2,
				bFactorGas: 1.2, bFactorWater: 1.0, initGasDecline: 90,	initOilDecline: 70,
				initWaterDecline: 90, timeStart: "", econLife: 10, price_oil: 89.00,
				price_gas: 3.00, cost_drillAndComplete: 1000000.0, cost_loe: 5000.0, cost_taxes: 8.0,
				production_oil: [],	production_cumOil: [], production_gas: [], production_cumGas: [],
				production_water: [], production_cumWater: [], production_month:[], revenue_oil: [],
				revenue_gas: [], revenue_water: [], revenue_month:[], revenue_netCashFlow: []
				}, 
				
				{id: 2, user: 'me',	wellName: "Meatball", initGasProduction: 1000.0, 
		 		initOilProduction: 200.0, initWaterProduction: 500.0, bFactorOil: 1.2,
				bFactorGas: 1.2, bFactorWater: 1.0, initGasDecline: 90,	initOilDecline: 70,
				initWaterDecline: 90, timeStart: "", econLife: 10, price_oil: 89.00,
				price_gas: 3.00, cost_drillAndComplete: 1000000.0, cost_loe: 5000.0, cost_taxes: 8.0,
				production_oil: [],	production_cumOil: [], production_gas: [], production_cumGas: [],
				production_water: [], production_cumWater: [], production_month:[], revenue_oil: [],
				revenue_gas: [], revenue_water: [], revenue_month:[], revenue_netCashFlow: []
				} 

				];

app.WellCollectionView = Backbone.View.extend({
	el: $('#wellCollectionView'),

	initialize: function(){
		console.log("initializing WellCollectionView");
		this.collection = new app.WellCollection();
		this.collection.reset(app.wells);
		this.render();
	},

	render: function(){
		console.log("rendering WellCollectionView");
		this.collection.each(function(item) {
			this.renderWell(item);
		}, this);
	},

	renderWell: function(item) {
		console.log("rendering "+ item.get("wellName") + " well for WellCollectionView");
		var wellDetailsView = new app.WellDetailsView({
			model: item
		});
		this.$el.append(wellDetailsView.render().el);
	}

});