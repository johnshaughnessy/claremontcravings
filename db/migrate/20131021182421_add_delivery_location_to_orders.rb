class AddDeliveryLocationToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :delivery_location, :string
  end
end
