window.ShopItem = Backbone.Model.extend({
  idAddtribute: "_id",
  url : function() {
    return this.get('_id') ? '/shopitem/' + this.get('_id') : '/shopitems';
  },

  defaults: function() {
    return {
      category: null 
    };
  }

});

window.ShoppingList = Backbone.Collection.extend({
  model: ShopItem,
  url: '/shopitems'
});
