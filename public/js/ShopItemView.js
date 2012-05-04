window.ShopItemView = Backbone.View.extend({
  tagName: "li",
  template: "#shopitemView",
  events: {},
  initialize: function() {
    _.bindAll(this,'render');
    this.options.categories.bind('all',this.render);
  },
  
  render: function() {
    $(this.el).html(_.template($(this.template).html(),{model: this.model, categories: this.options.categories}));
    return this;
  }

});
