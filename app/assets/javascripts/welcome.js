$(document).ready(function(){

    var NewReceiptEntry = function($food_item) {
        var food = $food_item.attr("food");
        var price = $food_item.attr("price");
        var food_id = $food_item.attr("id");

        // Add the item to the receipt
        var item_count = $("#receipt tr").length;
        var new_receipt_entry_color = (new Array('error', 'info', 'warning','success' ))[item_count%4];
        var new_receipt_entry = "";
        var receipt_entry_id = food_id + "-receipt-row";

        alert("this is happening");

        new_receipt_entry = new_receipt_entry + "<tr id=" + receipt_entry_id + " class="+ new_receipt_entry_color + ">";
        new_receipt_entry = new_receipt_entry +   "<td name='order[food-"+ item_count +"]'>" + food + "<input type='hidden' name='order[food-1]' value='hellofromrec'></input></td>";
        new_receipt_entry = new_receipt_entry +   "<td>" + price + "</td>";
        new_receipt_entry = new_receipt_entry +   "<td id=" + receipt_entry_id + "-receipt-count> 1 </td>"; //The count starts at 1
        new_receipt_entry = new_receipt_entry +   "<td>" + price + "</td>";
        new_receipt_entry = new_receipt_entry + "</tr>";

        return new_receipt_entry;
    }

    var ReplaceAddToOrderWithButtons = function($food_item){
        var food_id = $food_item.attr("id");

        // The "Add to Order" button is replaced with a way to select quantity
        var button_minus = "";
        button_minus = button_minus + "<div class='span1'>";
        button_minus = button_minus +   "<a class='btn btn-block btn-danger' id=" + food_id + "-decrease>";
        button_minus = button_minus +     "<i class='icon-minus'></i>";
        button_minus = button_minus +   "</a>";
        button_minus = button_minus + "</div>";

        var quantity = "";
        quantity = quantity + "<div class='span1 quantity'>";
        quantity = quantity +   "<h4 class='lead'>1</h4>";
        quantity = quantity + "</div>";
        
        var button_plus = "";
        button_plus = button_plus + "<div class='span1'>";
        button_plus = button_plus +   "<a class='btn btn-block btn-info increase-food'  id=" + food_id + "-increase>";
        button_plus = button_plus +     "<i class='icon-plus'></i>" ;
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

    var new_receipt_entry = NewReceiptEntry($item);
    $("#receipt").append(new_receipt_entry);

    ReplaceAddToOrderWithButtons($item);
    
    // We dynamically create functions by using .on()
    // This should be done another way so that one function 
    // works for any + / - button.

    // Function to increase quantity on orders
    $("#"+food_id+"-increase").on("click", function(){

        // Update the count in the buttons bar.
        var quantity = $(this).closest('div.row').children('.quantity').children('h4');
        var current_count = parseInt(quantity.text());
        quantity.text(""+(current_count+1));

        // Update the count in the receipt area.
        $("#"+food_id+"-receipt-row-receipt-count").text(""+(current_count+1));
    });

    // Function to decrease quantity on orders
    $("#"+food_id+"-decrease").on("click", function(){
        // alert($(this).closest('div.row').children('.quantity').text());
        var quantity = $(this).closest('div.row').children('.quantity').children('h4');
        var current_count = parseInt(quantity.text());
        quantity.text(""+(current_count-1));

        // Update the count in the receipt area.
        $("#"+food_id+"- receipt-row-receipt-count").text(""+(current_count-1));

        if (current_count == 1) {
            ReplaceButtonsWithAddToOrder($("#"+food_id+"-row"), food_id, food, price);
            $("#"+food_id+"-receipt-row").replaceWith("");
        }

    });
  }

  // When "Add to Order" is clicked on any given food, this function runs.
  $(".add-food").click(function(){
    AddFood($(this))
  });
});