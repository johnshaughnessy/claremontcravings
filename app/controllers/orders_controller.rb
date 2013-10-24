class OrdersController < ApplicationController
  def new
  end

  def create
    render text: params.inspect
    # @order = Order.new
    # @order.name = params["order"]["name"]
    # @order.delivery_location = params["order"]["delivery_location"]
    # i=0
    # if @order.save!
    #   # Cycle through the food items
    #   while (params["order"]["food-"+i.to_s+"-name"]) do

    #     # Create identical "receipt items" for however many there are 
    #     params["order"]["food-"+i.to_s+"-quantity"].to_i.times do 
    #       r = ReceiptItem.new
    #       r.order = @order
    #       r.food = Food.find_by_name(params["order"]["food-"+ i.to_s + "-name"])
    #       r.save
    #     end

    #     i = i+1
    #   end
    #   redirect_to @order
    # end
  
  end

  def show
    @order = Order.find(params[:id])
  end

end
