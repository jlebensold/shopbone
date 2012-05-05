window.ShopItemView = Backbone.View.extend({
  tagName: "tr",
  template: "#shopitemView",
  events: {
    'click .dropdown-menu a': 'setCategory',
    'click .delete': 'destroy'
  },
  initialize: function() {
    _.bindAll(this,'render','setCategory','destroy');
    this.options.categories.bind('all',this.render);
    this.model.bind('change',this.render);
  },
  destroy: function(e) {
    e.preventDefault();
    this.model.collection.remove(this.model);
    this.model.destroy();
    $(this.el).remove();
  },
  setCategory: function(e) {
   e.preventDefault();
   var c = this.options.categories.where({_id:$(e.target).data('id')})[0];
   this.model.set('category',c);
   this.model.save();
  },
  render: function() {
    $(this.el).html(_.template($(this.template).html(),{model: this.model, categories: this.options.categories}));
    return this;
  }

});
