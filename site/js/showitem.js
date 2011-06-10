$(document).ready(function(){
  moveFood.showItemLoad();
    $.ajax({
      url: "http://www.movefood.krangarajan.com/movefood/index.php/list_items",
      dataType: 'json',         
      method: "post",
      success: moveFood.showItem,
      error: moveFood.error,
    });
});

