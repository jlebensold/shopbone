window.ShoppingView = Backbone.View.extend({
  template: "#shoppingView",
  events: {
    'click .addtolist': 'addToList'
  },
  initialize: function() {
    _.bindAll(this,'render','addToList','addItem','shopItemView');
    this.collection = new ShoppingList();
    this.collection.bind('add',this.addItem);
    this.collection.bind('fetch',this.render);
    this.collection.fetch();
    this.options.categories.bind('all',this.render);
    this.collection.create({name: "pickles"});
  },

  addToList: function() {
    var items = _.compact($(this.el).find('.listbox').val().split('\n'));
    _.each(items,function(i) {
      this.collection.create({name: i });
    },this);
  },

  addItem: function(m) {
    this.shopItemView(m);
  },
 
  shopItemView: function(m) {
    viewModels = { model: m,
                   categories: this.options.categories
                 };
    $(this.el).find('.shoppinglist').append(new ShopItemView(viewModels).render().el);
  },

  render: function() {
    $(this.el).html($(this.template).html());
    var l = $(this.el).find(".shoppinglist");
    this.collection.each(function(i) {
      this.shopItemView(i);
    },this);
    return this;
  }

});
