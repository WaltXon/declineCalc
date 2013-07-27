
var app = app || {};

app.WellCollectionView = Backbone.View.extend({
	el: $('#wells'),

	intiailize: function(initWells){
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
				if( el.id === 'keywords' ) {
					formData[ el.id ] = [];
					_.each( $( el ).val().split( ' ' ), function( keyword ) {
						formData[ el.id ].push({ 'keyword': keyword });
					});
				} else {
					formData[ el.id ] = $( el ).val();
				}
			}
		});

		this.collection.create( formData );
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