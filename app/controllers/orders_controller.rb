class OrdersController < ApplicationController
  def new
  end

  def create
    # @order = Order.new(name: params[:order][:name])
    render :text => params.inspect 

    # @order.save
    # redirect_to @order
  end

  def show
    @order = Order.find(params[:id])
  end

end
