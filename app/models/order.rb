class Order < ActiveRecord::Base
  has_many :foods
end
