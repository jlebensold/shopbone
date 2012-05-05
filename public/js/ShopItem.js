window.ShopItem = Backbone.Model.extend({
  idAttribute: "_id",
  url : function() {
    return this.get('_id') ? '/shopitem/' + this.get('_id') : '/shopitems';
  },

  defaults: function() {
    return {
      category: null 
    };
  },

  parse: function(response) {
    response.category = new Category(response.category);
    return response;

  }

});

window.ShoppingList = Backbone.Collection.extend({
  model: ShopItem,
  url: '/shopitems'
});
