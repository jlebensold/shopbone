set :public_folder, File.dirname(__FILE__) + '/public'


# FIND ALL
get '/categories' do
  content_type :json
  Category.find(:all).to_json()
end

get '/shopitems' do
  content_type :json
  ShopItem.find(:all).to_json()
end

# CREATE
post '/categories' do 
  content_type :json
  c = Category.new(JSON.parse(request.body.read))
  c.save()
  c.to_json()
end

post '/shopitems' do 
  content_type :json
  si = ShopItem.new(JSON.parse(request.body.read));
  si.save()
  si.to_json()
end

# UPDATE 
put '/:type/:id' do
  content_type :json
  case params[:type]
  when "shopitem"
      si = ShopItem.find(params[:id])
      params = JSON.parse(request.body.read)
      si.category = nil
      si.update_attributes(params)
      si.save()
      return si.to_json()
  end
  return {}.to_json()
end


# DELETE
delete '/:type/:id' do
  content_type :json
  case params[:type]
  when "shopitem"
      return ShopItem.find(params[:id]).destroy().to_json()
  when "category"
      return Category.find(params[:id]).destroy().to_json()
  end
  return {}.to_json()
end

# FIND ONE 
get '/:type/:id' do
  content_type :json
  case params[:type]
  when "shopitem"
      return ShopItem.find(params[:id]).to_json()
  when "category"
      return Category.find(params[:id]).to_json()
  end
  return {}.to_json()
end


get '/' do
	erb :index
end

