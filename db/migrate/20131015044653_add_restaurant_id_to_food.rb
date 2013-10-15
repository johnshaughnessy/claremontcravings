class AddRestaurantIdToFood < ActiveRecord::Migration
  def change
    add_column :foods, :restaurant_id, :integer
  end
end
