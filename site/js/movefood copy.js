moveFood = {};
moveFood.settings = {
  "site": "http://localhost/MoveFood/site",
  "loggedIn": TRUE
};


moveFood.couchdb = function(){
  var items = "http://127.0.0.1:5984/movefood/_view/items_list/all";
  console.log(items);
  
/*
      $.ajax({
        url: "http://www.movefood.krangarajan.com/movefood/index.php/login/logged_in",
        data: "",
        async: false,
        success: function(results) {callback(results);},
        error: function(result) { moveFood.error(result) },
        dataType: "json"
    });
*/
};
console.log(moveFood.couchdb);


/* GENERAL FUNCTIONS */
/**
 * Return an error
 */

moveFood.error = function (error) {
  console.log("Error");
  console.log(error);
};


/* USER LOGIN & REGISTER FUNCTIONS */
moveFood.registerResponse = function() {
  console.log("added user");
};

moveFood.register = function() {

    var item = {};

    item.username = $('form#register-form #user_name').val();
    item.password = $('form#register-form #user_password').val();
    item.location = $('form#register-form #user_location').val();
    item.latitude = $('form#register-form #user_latitude').val();
    item.longitude = $('form#register-form #user_longitude').val();
    item.contact = $('form#register-form #user_contact').val(); // phone number
    item.description = $('form#register-form #user_description').val();

    var dataItem = {
      "username":item.username,
      "password":item.password,
      "location":item.location,
      "latitude":item.latitude,
      "longitude":item.longitude,
      "contact":item.contact,
      "description":item.description
    }
    console.log(item);

    // Insert values.
    $.ajax({
    	url: "http://www.movefood.krangarajan.com/movefood/index.php/register",
      type: "POST",
      dataType: 'json',
      data: dataItem,
      success: moveFood.registerResponse,
      error: moveFood.error
    });

    return false;
};

moveFood.hideLogin = function() {
    $('#login').hide();
    return false;
}

moveFood.showLogin = function() {
    $('#login').show();
    $('#user_name').focus();
    return false;
}

moveFood.login = function() {
    var userData = {
        "username":$('form#login-form #user_name').val(),
        "password":$('form#login-form #user_password').val()
    };
/*     console.log(userData); */
    $.ajax({
        url: "http://www.movefood.krangarajan.com/movefood/index.php/login",
        dataType: 'json',
        type: "POST",
        data: userData,
        success: moveFood.validateLogin,
        error: moveFood.error
    });
    return false;
};

moveFood.validateLogin = function(response) {
/*     console.log(response); */
    if (response.valid == "true") {
        moveFood.loadData();
        moveFood.hideLogin();
        return false;
    }
    else {
        moveFood.failedLogin();
    }
}

moveFood.failedLogin = function() {
  $('#login').show();
  $('#failedlogin').show();
  return false;
};

moveFood.isUserLoggedIn = function(callback) {
    $.ajax({
        url: "http://www.movefood.krangarajan.com/movefood/index.php/login/logged_in",
        data: "",
        async: false,
        success: function(results) {callback(results);},
        error: function(result) { moveFood.error(result) },
        dataType: "json"
    });
}

moveFood.loadData = function() {
    moveFood.isUserLoggedIn(moveFood.showUser);
}

moveFood.isLoggedIn = function (user) {
    return user != undefined && user.user;
}
moveFood.showUser = function(user) {
/*   console.log(user); */
  if (moveFood.isLoggedIn(user)) {
      $.ajax({
          url: "http://www.movefood.krangarajan.com/movefood/index.php/login/get_user_data",
          data: "",
          success: function(results) {moveFood.updateUserBlock(results);},
          error: function(result) { moveFood.error() },
          dataType: "json"});
      $.ajax({
          url: "http://www.movefood.krangarajan.com/movefood/index.php/my_items",
          data: "",
          success: function(results) {moveFood.renderItems(results);},
          error: function(result) { moveFood.error() },
          dataType: "json"});
      $.ajax({
          url: "http://www.movefood.krangarajan.com/movefood/index.php/list_claims",
          data: "",
          success: function(results) {moveFood.renderClaims(results);},
          error: function(result) { moveFood.error() },
          dataType: "json"});
  } else {
      moveFood.logout();
  }
}

moveFood.logout = function() {
    $.ajax({
      url: "http://www.movefood.krangarajan.com/movefood/index.php/login/logout",
      data: "",
      success: function(results) {moveFood.renderClaims(results);},
      error: function(result) { moveFood.error() },
      dataType: "json"
    });
    moveFood.updateUserBlock();
}

moveFood.updateUserBlock = function(user) {
  if (user != undefined) {
    $('#username').text(user.username);
    $('#welcomeuser').html("<a href='javascript:return false;' class='login'>Welcome " + user.username + "</a> ");
    $('#userlocation').text(user.location_description + ": " + user.latitude + ", " + user.longitude);
    $('#userbio').text(user.description);
    $('#userdetails').show();
    $('#loginlink').hide();
    $('#logoutlink').show();
    $('#welcomeuser').show();
    $('#createaccount').hide();
    $('#lists').show();
  }
  else {
    $('#userdetails').hide();
    $('#loginlink').show();
    $('#logoutlink').hide();
    $('#welcomeuser').hide();
    $('#createaccount').show();
    $('#lists').hide();
  }
}


/* FOOD ITEM FUNCTIONS */
/**
 * Render a list of food items.
 */
moveFood.renderItems = function(results) {
    var items = "";
    for (i in results) {
        items = items + "<li><a href='#'>" + results[i].name + "</a> <a href='#' id='food-item-" + results[i].item_id + "'  class='update-status'>Remove</a></li>"
    }
    $('#itemslist').html(items);
    $('#items').show();
}

/**
 * Show an individual item.
 */
moveFood.showItem = function(data) {
  var item;
  for (i in data) {
    item = data[i];
    $('div#content div#food_name').html(item.name);
    $('div#content div#food_description').html(item.description);
    $('div#content div#food_quantity').html(item.quantity);
    $('div#content div#food_perishable').html(item.perishable);
    $('div#content div#food_expiration').html(item.expiration);
    $('div#content div#food_location').html(item.location);
    $('div#content div#food_notes').html(item.notes);
    $('div#content div#food_contact').html(item.contact);
  }
};

/**
 * Food Item Add Item submit function.
 */
moveFood.addItemSubmit = function() {
  var data = {
    "food_name": $('form#add-item-block-form #food_name').val(),
    "description": $('form#add-item-block-form #food_description').val(),
    "quantity": $('form#add-item-block-form #food_quantity').val(),
    "units": $('form#add-item-block-form #food_units').val(),
    "perishable": $('form#add-item-block-form #food_perishable:checked').val(),
    "expiration": $('form#add-item-block-form #food_expiration').val(),
    "location_description": $('form#add-item-block-form #food_location_description:checked').val(),
    "default_location": $('form#add-item-block-form #food_default_location').val(),
    "notes": $('form#add-item-block-form #food_notes').val(),
    "contact_detail": $('form#add-item-block-form #food_contact_detail').val(),
    "default_contact": $('form#add-item-block-form #food_default_contact:checked').val()
  }

/*   console.log("adding Item Food"); */
/*   console.log(data); */

  // Insert values.
  $.ajax({
    url: "http://www.movefood.krangarajan.com/movefood/index.php/createitem",
    type: "POST",
    dataType: 'json',
    data: data,
    success: moveFood.addItem,
    error: moveFood.error,
  });
  return false;
};

moveFood.addItem = function() {
  window.location.href = 'http://www.movefood.krangarajan.com/index.html';
/*   console.log("added item"); */
};

moveFood.requireAuthentication = function(url) {
    user = moveFood.isUserLoggedIn(function (user) {
        if (moveFood.isLoggedIn(user) && url != undefined) {
            window.location = url;
        } else  {
            moveFood.showLogin();
        }
    });
}

/**
 * Load list of food items.
 */
moveFood.showFoodAjax = function() {
  $.ajax({
    url: "http://www.movefood.krangarajan.com/movefood/index.php/list_items",
    data: "",
    method: "post",
    success: function(results) {moveFood.showList(results);},
    error: function(results) {moveFood.showList(dataSampleFoodItem);},
    dataType: "json"
  });
};

/**
 * Show list of food items.
 */
moveFood.showList = function(results) {
  if(results === undefined) {
   results =  dataSampleFoodItem;
  }

  for (i in results) {
    if(results[i].perishable === 0) {
      results[i].perishable_text = "Yes";
    }
    else {
      results[i].perishable_text = "No";
    }

    var toolTip = "";

    var row = "<tr class='fooditem-id-" + results[i].item_id + "'>"
            + "<td class='food-name'>" + results[i].name + "</td>"
            + "<td class='location'>" + results[i].location + "</td>"
            + "<td class='perisable'>" + results[i].perishable_text + "</td>"
            + "<td class='expiration'>" + results[i].expiration + "</td>"
            + "<td><div class='claim button'><a href='#' onclick='moveFood.claim(" + results[i].item_id + "); return false;'>Claim this item</a></div></td>"
            + "<td><div class='tweet button'>" +  moveFood.tweetMessage(results[i]) + "</div></td>"
            + "<td><div class='text button'>" +  moveFood.textMessage(results[i]) + "</div></td>"
            + "</tr>";

  $('tr fooditem-id-' + results[i].item_id + ' a.send-text').click(moveFood.textAction(results[i]));
/* moveFood.requireAuthentication             */
    $('#food-list').append(row);
  }
};

/**
 * Show Load a food item.
 * @TODO pass this an item id.
 */
moveFood.showItemLoad = function() {
  $.ajax({
    url: "http://www.movefood.krangarajan.com/movefood/index.php/list_items",
    dataType: 'json',
    method: "post",
    success: moveFood.showItem,
    error: moveFood.error,
  });
};

/**
 * Render a list of a users claims.
 */
moveFood.renderClaims = function(results) {
    var items = "";
    for (i in results) {
        items = items + "<li><a href='#'>" + results[i].name + "</a> <a href='#' id='food-item-" + results[i].item_id + "'  class='update-status'>Remove</a></li>"
    }
    $('#claimslist').html(items);
    $('#claims').show();
}


/**
 * Build a tweet.
 */
moveFood.constructTweet = function(result) {
  var tweet = "";
  result.tweetLink = "http://www.movefood.krangarajan.com/food-list.html?id=" + result.item_id;
  if(result.name !== undefined) {
    tweet += result.name;
  }
  if (result.quantity !== undefined) {
    tweet += "[unit: " + result.quantity;
  }
  else{
      tweet += "[unit: 1";
  }
  if (result.units !== undefined) {
    tweet += " " + result.units + "]";
  }
  else{
      tweet += " unit]";
  }
  if (result.expiration !== undefined) {
      result.expirationShort = result.expiration.substr(0, (result.expiration.length - 9));
    tweet += "[expires: " + result.expirationShort + "]";
  }
  else{
  }
  if((result.latitude !== undefined) && (result.longitude !== undefined)) {
    tweet += " at (";
    tweet += result.latitude;
    tweet += ",";
    tweet += result.longitude;
    tweet += ")";
  }
  else if (result.location !== undefined){
    tweet +=  '[loc' + result.location.substr(0, 8) +']';
  }

/*   console.log(result); */
  result.tweet = tweet;
};

/**
 * Make tweet.
 */
moveFood.tweetMessage = function(result) {
/*   console.log(result); */
  moveFood.constructTweet(result);

  var maxLength = 140 - (result.tweet.length + 1);

  if (result.tweet.length > maxLength) {
    result.tweet = result.tweet.substr(0, (maxLength - 3)) + '...';
  }

  result.tweetThisLink = 'http://twitter.com/share?url=' + encodeURIComponent(result.tweetLink) + '&text=' + encodeURIComponent(result.tweet);

/*   console.log(result); */
  result.tweetStatus = '<a href="' + result.tweetThisLink +'" target="_blank"'+'>Tweet</a>';
  return result.tweetStatus;
}

/**
 * Make text message.
 */
moveFood.textMessage = function(result) {
   moveFood.constructTweet(result);
  var maxLength = 140 - (result.tweet.length + 1);
  if (result.tweet.length > maxLength) {
    result.tweet = result.tweet.substr(0, (maxLength - 3)) + '...';
  }

/*   console.log(result); */
  

  result.textLink = '<a href="#" class="send-text">Text/SMS</a>';
  return result.textLink;
}

moveFood.textAction = function(result) {

  var token = "02e46a20ee5cf243a264d9883ad078d01ee70b878ab1b110b63aa2e5aeacf02c09b702bb898dc604bc41ed02";
  var number = "14154259325";
  var name = "Chach+Sikes";
  var msg = result.tweet;
/*
  console.log(result);
  var tropo = "https://api.tropo.com/1.0/sessions";
  tropo += "?action=create";
  tropo += "&token=" + token;
  tropo += "&numberToDial=" + number;
  tropo += "&customerName=" + name;
  tropo += "&msg=" + encodeURIComponent(msg);
*/


  var smsifiedNumber = "17344189228";
  var address = "address=" + number;
  var message = "&message=" + msg;

  var smsified = "https://api.smsified.com/v1/smsmessaging/outbound/" + smsifiedNumber + "/requests";
/*   console.log(smsified); */
  
/*
  var smsifiedObj = {
   "resourceReference":{
      "resourceURL":
        smsified + address + message
    }
   };
*/

/*
// stringify
 var data = {
  "address" : number,
  "messages" : encodeURIComponent(msg)
 };
*/

  

  
  var msg2 = "this is a message";


  var post_data = JSON.stringify({  
  	'address' : number,  
  	'message': msg2,
  	'senderAddress': smsifiedNumber
  });  

/*
@TODO This needs to go to a php callback. 
  
  $.ajax({
    url: 'https://api.smsified.com/v1/smsmessaging/outbound/' + smsifiedNumber + '/requests',
    dataType: 'json',
    type: "POST",
    data: post_data,
    contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
    success: moveFood.textMessageSent,
    error: moveFood.error,
  });
*/

  return false;
};

moveFood.textMessageSent = function () {
/*   console.log("text message sent"); */
};

moveFood.claim = function(id) {
 var data = {
    "item_id":id
 }
 $.ajax({
    	url: "http://www.movefood.krangarajan.com/movefood/index.php/claim",
      type: "POST",
      dataType: 'json',
      data: data,
      success: moveFood.claimed,
      error: moveFood.error
    });
}

moveFood.claimed = function() {

}