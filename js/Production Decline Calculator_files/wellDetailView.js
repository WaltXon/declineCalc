
var app = app || {};


app.WellDetailsView = Backbone.View.extend({
	tagName: 'div',
	className: 'wellDetailsView',
	template: $("#wellDetailsTemplate").html(),

	events: {
		'click .delete': 'deleteWell'
	},

	deleteWell:function(){
		this.model.destroy();
		this.remove();
	},
	
	render: function() {
		console.log("rendering WellDetailsView");
		var tmpl = _.template(this.template);
		this.$el.html(tmpl(this.model.toJSON()));

		return this;
	} //end render
}); //End WellView Extend





