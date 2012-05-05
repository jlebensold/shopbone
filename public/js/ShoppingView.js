window.ShoppingView = Backbone.View.extend({
  template: "#shoppingView",
  events: {
    'click .addtolist': 'addToList'
  },
  initialize: function() {
    this.showToBuy = true;
    _.bindAll(this,'render','addToList','shopItemView','showPurchased','showHome');
    this.collection = new ShoppingList();
    this.collection.bind('reset',this.render);
    this.collection.bind('add',this.render);
    this.collection.fetch();
    this.options.categories.bind('all',this.render);
    

  },

  addToList: function() {
    var items = _.compact($(this.el).find('.listbox').val().split('\n'));
    _.each(items,function(i) {
      var c = this.options.categories.where({name : this.collection.getCategory(i) });
      var category = (c.length > 0) ? c[0] : null;
      this.collection.create({name: i , category: category});
    },this);
  },

  showHome: function() {
    this.showToBuy = true;
    this.collection.fetch();
  },

  showPurchased: function() { 
    this.showToBuy = false;
    this.collection.fetch();
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
    if (this.showToBuy){
      this.collection.toBuy().each(function(i) {
        this.shopItemView(i);
      },this);
    } else {
      this.collection.purchased().each(function(i) {
        this.shopItemView(i);
      },this);
    }
    return this;
  }

});
