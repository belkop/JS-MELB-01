// connect to your Firebase application using your reference URL
var messageAppReference = new Firebase("https://js-dev-test.firebaseio.com/");

$(document).ready(function () {

    $('#message-form').submit(function (event) {
        // by default a form submit reloads the DOM which will subsequently reload all our JS
        // to avoid this we preventDefault()
        event.preventDefault();

        // grab user message input
        var message = $('#message').val();

        // clear message input (for UX purposes)
        $('#message').val('');

        // create a section for messages data in your db
        var messagesReference = messageAppReference.child('messages');

        // use the set method to save data to the messages
        messagesReference.push({
            message: message,
            votes: 0
        });
    });

    // on initialization of app (when document is ready) get fan messages
    messageClass.getFanMessages();
});

var messageClass = (function () {
  function getFanMessages() {
    // retrieve messages data when .on() initially executes
    // and when its data updates
    messageAppReference.child('messages').on('value', function (results) {
      var $messageBoard = $('.message-board')

      // remove list to avoid dupes
      $messageBoard.empty();

      var allMessages = results.val();
      // iterate through results coming from database call; messages
      for (var msg in allMessages) {
        // get method is supposed to represent HTTP GET method
        var message = allMessages[msg].message;
        var votes = allMessages[msg].votes;

        // create message element
        var $messageListElement = $('<li></li>');

        // create delete element
        var $deleteElement = $('<i class="fa fa-trash pull-right delete"></i>');
        $deleteElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id');
          deleteMessage(id);
        })

        // create up vote element
        var $upVoteElement = $('<i class="fa fa-thumbs-up pull-right"></i>');
        $upVoteElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id');
          updateMessage(id, ++votes);
        })

        // create down vote element
        var $downVoteElement = $('<i class="fa fa-thumbs-down pull-right"></i>');
        $downVoteElement.on('click', function (e) {
          var id = $(e.target.parentNode).data('id');
          updateMessage(id, --votes);
        })

        // add id as data attribute so we can refer to later for updating
        $messageListElement.attr('data-id', msg);

        // add message to li
        $messageListElement.html(message);

        // add delete element
        $messageListElement.append($deleteElement);

        // add voting elements
        $messageListElement.append($upVoteElement);
        $messageListElement.append($downVoteElement);

        // show votes
        $messageListElement.append('<div class="pull-right">' + votes + '</div>');

        //add message to list in the dom.
        $messageBoard.append($messageListElement);
      }
    });
  }

  function updateMessage(id, votes) {
    // find message whose objectId is equal to the id we're searching with
    var messageReference = new Firebase('https://js-dev-test.firebaseio.com/messages/' + id);

    // update votes property
    messageReference.update({
      votes: votes
    });
  }

  function deleteMessage(id) {
    // find message whose objectId is equal to the id we're searching with
    var messageReference = new Firebase('https://js-dev-test.firebaseio.com/messages/' + id);

    messageReference.remove();
  }

  return {
    getFanMessages: getFanMessages
  }

})();
