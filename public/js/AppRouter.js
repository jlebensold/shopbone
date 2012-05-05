window.AppRouter = Backbone.Router.extend({
  routes: {
    "home":       "home",    
    "purchased":  "purchased",
    "categories": "categories",
    "*default": "default_route"
  },
  home: function() {
    $(".nav li.active").removeClass('active');
    $(".home").addClass('active');       
    this.categoryView.hide();
    this.shoppingView.showHome();
  },
  default_route: function(action) {
    this.navigate('home',{trigger:true});
  },
  categories: function() {
      this.categoryView.show();
  },
  purchased: function() {
      $(".nav li.active").removeClass('active');
      $(".showpurchased").addClass('active');
      this.shoppingView.showPurchased();
  },
  initialize: function() {
    var categories = new CategoryCollection();
    this.categoryView = new CategoryView({collection: categories });
    $("#categorymodal").html(this.categoryView.render().el);
    var t = this;
    $('#categorymodal').on('hide', function () {
      t.navigate('home',{trigger:true});
    })
    
    this.shoppingView = new ShoppingView({categories: categories });
    $("#app").html(this.shoppingView.render().el);
  }

});
