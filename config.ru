require 'rubygems'
require 'bundler'
Bundler.require

require './app.rb'
require 'mongoid'
require './models/category.rb'
require './models/shop_item.rb'
require './models/shopping_list.rb'


set :environment, :development
set :run, false
ENV["RACK_ENV"] ||= 'development'

Mongoid.load!("./config/mongoid.yml")


run Sinatra::Application
