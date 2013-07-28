
var app = app || {};

app.WellCollectionView = Backbone.View.extend({
	el: $('#wells'),

	initialize: function(initWells){
		console.log('intiailize WellCollectionView');
		this.collection = new app.WellCollection(initWells);
		// this.collection.fetch();
		this.render();
		
		this.listenTo( this.collection, 'add', this.renderBook );
		this.listenTo( this.collection, 'reset', this.render );
	},

	events: {
		'click #add': 'addWell'
	},

	addWell: function( e ) {
		e.preventDefault();

		var formData = {};

		$( '#addWell div' ).children( 'input' ).each( function( i, el ) {
			if( $( el ).val() != "" )
			{
				formData[ el.id ] = $( el ).val();
			}
		});

		this.collection.add(new app.Well( formData ));
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