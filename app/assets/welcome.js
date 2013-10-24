$(document).ready(function(){

    var NewReceiptEntry = function($food_item) {
        var food = $food_item.attr("food");
        var price = $food_item.attr("price");
        var food_id = $food_item.attr("id");

        // Add the item to the receipt
        var item_count = $("#receipt tr").length;
        var new_receipt_entry_color = (new Array('error', 'warning','success' ))[item_count%3];
        var new_receipt_entry = "";
        var receipt_entry_id = food_id + "-receipt-row";
        var receipt_row_quantity_id = receipt_entry_id + "-receipt-count";
        var receipt_row_quantity_input_id = receipt_row_quantity_id + "-input";
        var receipt_row_price_id = receipt_entry_id + "-receipt-price";
        var receipt_row_total_id = receipt_entry_id + "-receipt-total";

        // Each receipt entry will have hidden input fields that are relevant to the order.
        new_receipt_entry = new_receipt_entry + "<tr id=" + receipt_entry_id + " class="+ new_receipt_entry_color + ">";

        new_receipt_entry = new_receipt_entry +   "<td>" + food; 
        new_receipt_entry = new_receipt_entry +     "<input type='hidden' name='order[food-"+ item_count +"]' value='"+ food +"'></input>";
        new_receipt_entry = new_receipt_entry +   "</td>";

        new_receipt_entry = new_receipt_entry +   "<td id=" + receipt_row_quantity_id +"> 1 ";
        new_receipt_entry = new_receipt_entry +     "<input id='"+ receipt_row_quantity_input_id +"' type='hidden' name='order[food-"+ item_count +"-quantity]' value='1'></input>";
        new_receipt_entry = new_receipt_entry +   "</td>";
        new_receipt_entry = new_receipt_entry +   "<td id="+ receipt_row_price_id+">" + price + "</td>";
        new_receipt_entry = new_receipt_entry +   "<td id="+ receipt_row_total_id +">" + price + "</td>";
        new_receipt_entry = new_receipt_entry + "</tr>";

        return new_receipt_entry;
    }

    var ReplaceAddToOrderWithButtons = function($food_item){
        var food_id = $food_item.attr("id");

        // The "Add to Order" button is replaced with a way to select quantity
        var button_minus = "";
        button_minus = button_minus + "<div class='span1'>";
        button_minus = button_minus +   "<a class='btn btn-block btn-info' id=" + food_id + "-decrease>";
        // button_minus = button_minus +     "<i class='icon-minus'></i>";
        button_minus = button_minus +     "<h1>-</h1>";
        button_minus = button_minus +   "</a>";
        button_minus = button_minus + "</div>";

        var quantity = "";
        quantity = quantity + "<div class='span1 quantity'>";
        quantity = quantity +   "<h4 class='lead'>1</h4>";
        quantity = quantity + "</div>";
        
        var button_plus = "";
        button_plus = button_plus + "<div class='span1'>";
        button_plus = button_plus +   "<a class='btn btn-block btn-danger increase-food'  id=" + food_id + "-increase>";
        // button_plus = button_plus +     "<i class='icon-plus'></i>" ;
        button_plus = button_plus +     "<h1>+</h1>";
        button_plus = button_plus +   "</a>";
        button_plus = button_plus + "</div>";

        $food_item.parent().append(button_minus);
        $food_item.parent().append(quantity);
        $food_item.parent().append(button_plus);

        // The "Add to Order" button is replaced
        $food_item.replaceWith("");
    }

    var ReplaceButtonsWithAddToOrder = function($food_row, $food_id, $food, $price){
        var add_to_order = "";
        add_to_order = add_to_order + "<div class='row' id='" + $food_id + "-row'>";
        add_to_order = add_to_order +   "<a class='add-food btn btn-primary btn-block' ";
        add_to_order = add_to_order +   "food='" + $food + "' price=" + $price + " id=" + $food_id + ">";
        add_to_order = add_to_order +     "Add to Order"
        add_to_order = add_to_order +   "</a>";
        add_to_order = add_to_order + "</div>";


        // '<div class="row">{id:"#{food.name.downcase.delete(" ") + "-row"}"}<a class="add-food btn btn-primary btn-block">{food:"#{food.name}", price:"#{food.price}", id:"#{food.name.downcase.delete(' ')}"} Add to Order</a></div>"';


        // $(this).append(add_to_order);
        // The buttons is replaced
        $food_row.replaceWith(add_to_order);

        $("#"+$food_id).click(function(){
            AddFood($(this));
        });
    }

  var AddFood = function($item){
    // These will help us throughout, so we might as well grab them as vars.
    var food = $item.attr("food");
    var price = $item.attr("price");
    var food_id = $item.attr("id");
    var receipt_entry_id = food_id + "-receipt-row";
    var receipt_row_quantity_id = receipt_entry_id + "-receipt-count";
    var receipt_row_total_id = receipt_entry_id + "-receipt-total";
    var receipt_row_price_id = receipt_entry_id + "-receipt-price";
    var receipt_row_quantity_input_id = receipt_row_quantity_id + "-input";


    // Add this item to the receipt
    var new_receipt_entry = NewReceiptEntry($item);
    $("#receipt").append(new_receipt_entry);

    // Replace the "Add to Order" Button with quantity-selection buttons
    ReplaceAddToOrderWithButtons($item);
    
    // We dynamically create functions by using .on()
    // This should be done another way so that one function 
    // works for any + / - button.

    Function to increase quantity on orders
    $("#"+food_id+"-increase").on("click", function(){

        var item_count = $("#receipt tr").length;

        // Update the count in the buttons bar.
        var quantity = $(this).closest('div.row').children('.quantity').children('h4');
        var current_count = parseInt(quantity.text()) + 1;
        quantity.text(""+(current_count));

        // Update the count in the receipt area.
        $("#"+receipt_row_quantity_id).text(""+(current_count))
        $("#"+receipt_row_quantity_id).append("<input id='"+ receipt_row_quantity_input_id +"' type='hidden' name='order[food-"+ item_count +"-quantity]' value='"+current_count+"'></input>");

        // Update the total for the order in the receipt area.
        var price = parseInt($("#" + receipt_row_price_id).text());
        $("#"+receipt_row_total_id).text(""+(current_count*price));
    });

    // Function to decrease quantity on orders
    $("#"+food_id+"-decrease").on("click", function(){
        // alert($(this).closest('div.row').children('.quantity').text());
        var quantity = $(this).closest('div.row').children('.quantity').children('h4');
        var current_count = parseInt(quantity.text()) -1;
        quantity.text(""+(current_count));

        var item = $(receipt_entry_id);
        var item_row = $("#receipt tr").index( item );

        // Update the count in the receipt area.
        $("#"+receipt_row_quantity_id).text(""+(current_count))
        $("#"+receipt_row_quantity_id).append("<input id='"+ receipt_row_quantity_input_id +"' type='hidden' name='order[food-"+ (parseInt(item_row) - 1) +"-quantity]' value='"+current_count+"'></input>");

        // Replace the quantity-selection buttons with the add-to-order bar when they want 0
        // and remove the row in the receipt area.
        if (current_count == 0) {
            ReplaceButtonsWithAddToOrder($("#"+food_id+"-row"), food_id, food, price);
            $("#"+food_id+"-receipt-row").replaceWith("");
        }

        // Update the total for the order in the receipt area.
        var price = parseInt($("#" + receipt_row_price_id).text());
        $("#"+receipt_row_total_id).text(""+(current_count*price));

    });
  }

  // When "Add to Order" is clicked on any given food, this function runs.
  $(".add-food").click(function(){
    AddFood($(this))
  });

  $("div.thumbnail").on("click", ".increase-food",function(){
    alert("Hello + " + $(this).text());
  });
});