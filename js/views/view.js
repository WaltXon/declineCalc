
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





