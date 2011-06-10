moveFood = {};
moveFood.settings = {
  "site": "http://localhost/MoveFood/site",
  "loggedIn": true
};


moveFood.couchdb = function(){
  var itemsQuery = "http://127.0.0.1:5984/movefood/_view/items_list/all?callback=?";

/*
var dbc = $.jqCouch.connection('db');
dbc.exists('movefood');

if ($.jqCouch.connection('db').create('movefood2').ok) {
    console.log("movefood");
}
*/
/*
  
    $.ajax({
        url: itemsQuery,
        type: "GET",
        async: false,
        contentType: 'application/json',
        success: function(results) {console.log(results);},
        error: function(result) { moveFood.error(result) },
        dataType: "json"  
    });
    
*/
var data = {};
$.ajax({
  url: itemsQuery,
  dataType: 'json',
  data: data,
  success: console.log("success")
});
        
/*

    
  $.getJSON(itemsQuery, function(data) {
    var items = [];

    $.each(data, function(key, val) {
      items.push('<li id="' + key + '">' + val + '</li>');
    });
  
    $('<ul/>', {
      'class': 'my-new-list',
      html: items.join('')
    }).appendTo('body');
  });
*/
};
moveFood.couchdb();
