$( document ).ready(function() {
  $('#sendMessageButton').click(function(){
    var input = $('#messageInput');
    var message = input.val();
    var data  = {
      message: message
    };
    $.ajax({
      method: "POST",
      url: "messages",
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
    input.val("");
  });

  var poll = function(){
    $.ajax({
      method: 'GET',
      url: 'messages',
      success: function(data){
        console.log("poll: " + JSON.stringify(data));
        $('<div></div>').text(data.message).appendTo($('#messages'));
        poll();
      },
      timeout: 30000
    });
  };
  poll();

});
