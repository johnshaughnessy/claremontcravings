# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

["Eureka!", "YogurtLand", "50-Fifty"].each do |restaurant|
  Restaurant.find_or_create_by_name(restaurant)
end

[["The Original", 1375],["Napa Burger", 1475], ["Truffle Fries", 9]].each do |food,price|
  Restaurant.find_by_name("Eureka!").foods.find_or_create_by_name_and_price(food, price)
end