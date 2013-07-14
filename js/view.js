

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


var CurrentInfoView = Backbone.View.extend({
	tagName: 'div',

	template: _.template($('#currentInfo').html()),

	events: {
		"dblclick .view": "edit",
		"keypress .edit": "updateOnEnter"
	},

	initialize: function(){
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "destroy", this.remove);
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		this.input = this.$('edit');
		return this;
	},

	edit: function(){
		this.$el.addClass("editing");
		this.input.focus();

	},

	close: function() {
		var value = this.input.val();
		if (!value){
			this.clear();
		}else {
			this.model.save({id: value});
			this.$el.removeClass("editing");
		}
	}, 

	updateOnEnter: function(e){
		if (e.keyCode ==13) this.close();
	},

	clear: function(){
		this.model.destroy();
	}

})

var FormView = Backbone.View.extend({
  events: {
    "change input.content":  "contentChanged"
  },
  initialize: function() {
    _.bindAll(this, 'contentChanged');
    this.inputContent = this.$('input.content');
  },
  contentChanged: function(e) {
    var input = this.inputContent;

    // if you use local storage save 
    this.model.save({content: input.val()});

    // if you send request to server is prob. good idea to set the var and save at the end, in a blur event or in some sync. maintenance timer.
    // this.model.set({content: input.val()});
  }
});

var form = new FormView();