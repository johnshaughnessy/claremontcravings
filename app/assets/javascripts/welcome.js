$(document).ready(function(){

  // When "Add to Order" is clicked on any given food, this function runs.
  $(".add-food").click(function(){
    alert("add-food is called");

    // These will help us throughout, so we might as well grab them as vars.
    var food = $(this).attr("food");
    var price = $(this).attr("price");
    var food_id = $(this).attr("id");

    // Add the item to the receipt
    var item_count = $("#receipt tr").length;
    var new_receipt_entry_color = (new Array('error', 'info', 'warning','success' ))[item_count%4];
    var new_receipt_entry = "";
    new_receipt_entry = new_receipt_entry + "<tr class="+ new_receipt_entry_color +">";
    new_receipt_entry = new_receipt_entry +   "<td>" + food + "</td>";
    new_receipt_entry = new_receipt_entry +   "<td>" + price + "</td>";
    new_receipt_entry = new_receipt_entry +   "<td> 1 </td>";
    new_receipt_entry = new_receipt_entry +   "<td>" + price + "</td>";
    new_receipt_entry = new_receipt_entry + "</tr>"
    $("#receipt").append(new_receipt_entry);


    // The "Add to Order" button is replaced with a way to select quantity
    var button_minus = "";
    button_minus = button_minus + "<div class='span1'>";
    button_minus = button_minus +   "<a class='btn btn-block btn-danger'>";
    button_minus = button_minus +     "<i class='icon-remove'></i>";
    button_minus = button_minus +   "</a>";
    button_minus = button_minus + "</div>";

    var quantity = "";
    quantity = quantity + "<div class='span1'>";
    quantity = quantity +   "<h4 class='lead'>1</h4>";
    quantity = quantity + "</div>";
    
    var button_plus = "";
    button_plus = button_plus + "<div class='span1'>"
    button_plus = button_plus +   "<a class='btn btn-block btn-info increase-food'  id=" + food_id + "-increase>"
    button_plus = button_plus +     "<i class='icon-plus'></i>" 
    button_plus = button_plus +   "</a>"
    button_plus = button_plus + "</div>"

    $(this).parent().append(button_minus);
    $(this).parent().append(quantity);
    $(this).parent().append(button_plus);

    // The "Add to Order" button is replaced
    $(this).replaceWith("");

    // We dynamically create functions by using .on()
    // This should be done another way so that one function 
    // works for any + / - button.
    $("#"+food_id+"-increase").on("click", function(){
      alert("this has been called");
    });
  });

  $("div").on("click", "a.increase-food",function(){
    alert("hello");
    // $(this).unbind("click");
    // These will help us throughout, so we might as well grab them as vars.
    var food = $(this).attr("food");
    var price = $(this).attr("price");
    var food_id = $(this).attr("id");

    // Add the item to the receipt
    var item_count = $("#receipt tr").length;
    var new_receipt_entry_color = (new Array('error', 'info', 'warning','success' ))[item_count%4];
    var new_receipt_entry = "";
    new_receipt_entry = new_receipt_entry + "<tr class="+ new_receipt_entry_color +">";
    new_receipt_entry = new_receipt_entry +   "<td>" + food + "</td>";
    new_receipt_entry = new_receipt_entry +   "<td>" + price + "</td>";
    new_receipt_entry = new_receipt_entry +   "<td> 1 </td>";
    new_receipt_entry = new_receipt_entry +   "<td>" + price + "</td>";
    new_receipt_entry = new_receipt_entry + "</tr>"
    $("#receipt").append(new_receipt_entry);
  });

  

});