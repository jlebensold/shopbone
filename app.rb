set :public_folder, File.dirname(__FILE__) + '/public'


get '/q/:term' do
  content_type :json
  out.to_json()
end


get '/' do
  Category.delete_all()
  ShopItem.delete_all()
  ShoppingList.delete_all()


  c = Category.new({name: "Home Hardware"})
  c.save()

  si = ShopItem.new({name:"carrots", category: c})
  si.save()


  si2 = ShopItem.new({name:"turnips", category:c})
  si2.save()

  sl = ShoppingList.new({shopping_date: Date.parse("January 1, 2000") })
  sl.shop_items = [si,si2]
  sl.save()


	erb :index
end

