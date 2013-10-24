$(document).ready(function(){

  var NewReceiptItem = function($name, $price, $quantity){
    var receipt = $("#receipt");
    var index = receipt.children().length;

    var base_id = RemoveSpaces($name);
    var base_input_name = "order[food-" + index + "-";

    var name_data = NewTableData("name", $name, "input_id", base_input_name+"name]", $name);
    var quantity_data = NewTableData("quantity", $quantity, "input_id", base_input_name+"quantity]", $quantity);
    var price_data = NewTableData("price", $price, "input_id", base_input_name+"price]", $price);
    var total_data = NewTableData("total", ($price * 1), "input_id", base_input_name+"total]", ($price * $quantity));

    var row = "";
    row = row + "<tr id="+base_id+">";
    row = row +   name_data;
    row = row +   quantity_data;
    row = row +   price_data;
    row = row +   total_data;
    row = row + "</tr>";

    return row;
  }

  var RemoveSpaces = function($text_with_spaces){
    return $text_with_spaces.replace(/\s+/g, '');
  }

  var NewTableData = function($class, $text, $input_id, $input_name, $input_value){
    var td = "";

    td = td + "<td class="+$class+">";
    td = td +       $text;
    // Beginning of input opening-tag
    td = td +   "<input type='hidden' ";
    td = td +          "id=" + $input_id + " ";
    td = td +          "name='" + $input_name + "' ";
    td = td +          "value='" + $input_value + "' ";
    td = td +          ">";
    // End of input opening-tag
    
    // Close input tag.
    td = td +   "</input>";
    td = td + "</td>";

    return td;
  }

  var NewButtonsForFood = function($food){

    var base_id = RemoveSpaces($food);

    var button_minus = "";
    button_minus = button_minus + "<div class='span1'>";
    button_minus = button_minus +   "<a class='btn btn-block btn-info minus' food=" + base_id + ">";
    button_minus = button_minus +     "<h1>-</h1>";
    button_minus = button_minus +   "</a>";
    button_minus = button_minus + "</div>";

    var quantity = "";
    quantity = quantity + "<div class='span1 quantity'>";
    quantity = quantity +   "<h4 class='lead'>1</h4>";
    quantity = quantity + "</div>";

    var button_plus = "";
    button_plus = button_plus + "<div class='span1'>";
    button_plus = button_plus +   "<a class='btn btn-block btn-danger plus'  food=" + base_id + ">";
    button_plus = button_plus +     "<h1>+</h1>";
    button_plus = button_plus +   "</a>";
    button_plus = button_plus + "</div>";

    var rowContents = "<div class='quantityButtons'>";
    rowContents = rowContents + button_minus;
    rowContents = rowContents + quantity;
    rowContents = rowContents + button_plus;
    rowContents = rowContents + "</div>";

    return rowContents;
  }

  var NewAddToOrderButtonForFoodAndPrice = function($food,$price){
    var addToOrder = "";
    addToOrder = addToOrder + "<div class='addToOrder'>";
    addToOrder = addToOrder + "<a class='btn btn-primary btn-block' food='"+$food+"' price="+$price+">";
    addToOrder = addToOrder + "Add to Order</a>";
    addToOrder = addToOrder + "</div>";

    return addToOrder;
  }

  // When Add To Order is pressed
  $(".MenuItemRow").on("click", ".addToOrder a", function(){

    var food = $(this).attr("food");
    var price = $(this).attr("price");
    var quantity = 1;

    // Create a new row in the receipt
    $("#receipt").append(NewReceiptItem(food, price, quantity));

    // Replace the Add to Order button with quantity selection options
    $(this).parent().parent().html(NewButtonsForFood(food));
  });

  $(".MenuItemRow").on("click", ".quantityButtons a", function(){
    // Get the row
    var row_id = $(this).attr("food");

    // Get quantity variables
    var quantity_data = $("#"+row_id+" .quantity");
    var quantity_input = $("#"+row_id+" .quantity input");
    var quantity = parseInt(quantity_input.attr("value"));
    var countOnItem = $(".MenuItemRow h4");

    // Get total variables
    var total_data = $("#"+row_id+" .total");
    var total_input = $("#"+row_id+" .total input");

    // Get price
    var price = parseInt($("#"+row_id+" .price input").attr("value"));

    // Get name
    var name = $("#"+row_id+" .name input").attr("value");
    
    // Find the new quantity
    var new_quantity = 0;
    if ($(this).hasClass("plus")) {
        new_quantity = quantity + 1;
        
    } else if ($(this).hasClass("minus")){
        new_quantity = quantity - 1;
    }

    // Update the receipt row
    quantity_input.attr("value", new_quantity);
    quantity_data.text(new_quantity);
    quantity_data.append(quantity_input);

    total_input.attr("value", new_quantity*price);
    total_data.text(new_quantity*price);
    total_data.append(total_input);

    // Update the count on the Item.
    countOnItem.text(new_quantity);

    // Remove the item if necessary
    if (new_quantity == 0){
        // From the receipt
        $("#"+row_id).remove();
        // Replace the "Add To Order" button 
        $(this).parents("div .quantityButtons").replaceWith(NewAddToOrderButtonForFoodAndPrice(name, price));

    }
    


  });

  





































});