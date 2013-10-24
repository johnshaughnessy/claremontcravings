class Order < ActiveRecord::Base
  has_many :receipt_items
  has_many :foods, through: :receipt_items
end
