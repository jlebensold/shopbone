class ShopItem
	include Mongoid::Document
	include Mongoid::Timestamps

	field :version, type: Integer
  field :name, type: String 
  field :purchased, type: Boolean
  embeds_one :category
end
