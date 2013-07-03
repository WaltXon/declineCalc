var WellView = Backbone.View.extend({
	tagName: 'li',
	wellTpl:_.template("An Example Template"),
	events: {
	}, //end events
	render: function() {
		this.$el.html(this.wellTpl(this.model.toJSON()));
	} //end render
}); //End WellView Extend

var wellview = new WellView();
console.log(wellview.el);