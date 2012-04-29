class ShopItem
	include Mongoid::Document
	include Mongoid::Timestamps

	field :version, type: Integer
  field :name, type: String 
  field :quantity, type: Integer

  embeds_one :category
end
