# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

["Eureka", "YogurtLand", "50-Fifty"].each do |restaurant|
  Restaurant.find_or_create_by_name(restaurant)
end

[["The Original", 1375],["Napa Burger", 1475], ["Truffle Fries", 900]].each do |food,price|
  Restaurant.find_by_name("Eureka").foods.find_or_create_by_name_and_price(food, price)
end

[["Strawberry Froyo", 475],["Red Velvet Froyo", 475], ["Tart Froyo", 475]].each do |food,price|
  Restaurant.find_by_name("YogurtLand").foods.find_or_create_by_name_and_price(food, price)
end

[["Spicy Asian Chicken", 1475],["Mandalay Curry", 1565], ["Braised Beef Short Ribs", 1635]].each do |food,price|
  Restaurant.find_by_name("50-Fifty").foods.find_or_create_by_name_and_price(food, price)
end