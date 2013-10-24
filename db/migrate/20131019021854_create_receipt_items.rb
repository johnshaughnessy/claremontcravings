class CreateReceiptItems < ActiveRecord::Migration
  def change
    create_table :receipt_items do |t|
      t.integer :food_id
      t.integer :order_id

      t.timestamps
    end
  end
end
