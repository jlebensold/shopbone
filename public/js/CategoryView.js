window.CategoryView = Backbone.View.extend({
	tagName: 'div',
  template: "#categoryView",
  events: {
    'click .category_add': 'addCategory',
    'click .delete': 'removeCategory',
    'click .modal-footer .btn': 'hide'
  },
	initialize: function() {
		_.bindAll(this,'render','addCategory','removeCategory');
    this.collection.fetch();
    this.collection.bind('all',this.render);
  },
 
  show: function() {
    $($(this.el).parents('.modal')).modal();
  },
  hide: function() {
    $($(this.el).parents('.modal')).modal('hide');
  },
  removeCategory: function(e) { 
    e.preventDefault();
    var id =$(e.target).parents('li').data('id');
    var model = this.collection.where({_id:id})[0];
    this.collection.remove(model);
    model.destroy();
  },

  addCategory: function(e) {
    e.preventDefault();
    this.collection.create({name:$(this.el).find('.category_name').val() });
  },

  render: function() {
    $(this.el).html($(this.template).html());

    $(this.el).find('.categories').empty();
    this.collection.each(function(c) {
      $(this.el).find('.categories').append('<li data-id="'+c.get('_id')+'" >'+c.get('name')+" <a href='#' class='pull-right delete'>x</a> </li>");
    },this);
    return this;
  }
});
