class ReceiptItem < ActiveRecord::Base
  belongs_to :food
  belongs_to :order
end