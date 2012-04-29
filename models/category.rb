class Category 
	include Mongoid::Document
	include Mongoid::Timestamps

  store_in :categories
  field :name, type: String

end
