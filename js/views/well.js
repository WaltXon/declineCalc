
var app = app || {};


app.WellView = Backbone.View.extend({
	tagName: 'div',
	className: 'wellContainer',
	template: $("#wellTemplate").html(),

	events: {
		'click .delete': 'deleteWell'
	},

	deleteWell:function(){
		this.model.destroy();
		this.remove();
	},
	
	render: function() {
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.toJSON()));

		return this;
	} //end render
}); //End WellView Extend





