
var app = app || {};


// Well Collection
// --------------------

app.WellCollection = Backbone.Collection.extend({
	model: app.Well,
	url: '/wells'

	// ,	localStorage: new Backbone.LocalStorage("wells-backbone")

});


