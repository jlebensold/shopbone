window.ShopItem = Backbone.Model.extend({
  idAttribute: "_id",
  url : function() {
    return this.get('_id') ? '/shopitem/' + this.get('_id') : '/shopitems';
  },

  defaults: function() {
    return {
      category: null,
      purchased: false
    };
  },

  parse: function(response) {
    response.category = new Category(response.category);
    return response;

  }

});

window.ShoppingList = Backbone.Collection.extend({
  model: ShopItem,
  url: '/shopitems',

  toBuy: function() {
    return new ShoppingList(this.where({purchased: false}));
  },

  purchased: function() {
    return new ShoppingList(this.where({purchased: true}));
  },

  productCategories: function() {
    var categories = [];
    
    this.sort().each(function(i){
      if (i.get('category'))
        categories.push({item: i.get('name'), category: i.get('category').get('name')});
    });
    return _.uniq(categories,false,function(i) { return i.item });
  },

  getCategory: function(productName) {
    var r = _.find(this.productCategories(),function(i) { return i.item == productName });
    return (r) ? r.category : '';
  }
});
window.ShoppingList.prototype.comparator = function(item) {
  return (99999999999 - new Date(Date.parse(item.get('created_at'))).getTime());
};
