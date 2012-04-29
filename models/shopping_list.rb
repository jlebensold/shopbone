class ShoppingList
	include Mongoid::Document
	include Mongoid::Timestamps

	field :version, type: Integer
  field :notes, type: String 
  field :shopping_date, type: Date 
  
  embeds_many :shop_items, class_name: "ShopItem"
 
end
