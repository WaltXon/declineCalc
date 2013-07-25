
var app = app || {};


app.WellView = Backbone.View.extend({
	tagName: 'div',
	className: 'wellContainer',
	template:_.template( $("#wellTemplate").html()),

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	} //end render
}); //End WellView Extend


app.WellCollectionView = Backbone.View.extend({
	el: '#wells',

	intiailize: function(initialWells){
		this.collection = new app.WellList(intialWells);
		this.render();
	},

	render: function(){
		this.collection.each(function(item) {
			this.renderWell(item);
		}, this);
	},

	renderWell: function(item) {
		var wellView = new app.WellView({
			model: item
		});
		this.$el.append(wellView.render().el);
	}

});


