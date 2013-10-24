class Food < ActiveRecord::Base
  belongs_to :restaurant
  has_many :receipt_items
  has_many :orders, through: :receipt_items
end
