'use strict';
var MyApp = {};

// Compile element using handlebars
MyApp.compileItem = function(item) {
  var source = $('#to-do-template').html();
  var template = Handlebars.compile(source);
  return template(item);
}

// Note: this starter data is usually loaded from somewhere
MyApp.todos = [{
    toDo: "Clean fridge"
}, {
    toDo: "Take out Puppy"
}, {
    toDo: "Finish work"
}];

// Initial population of the list from todos array
MyApp.populateList = function(list) {
  for (var i=0; i<MyApp.todos.length; ++i) {
    var newItem = MyApp.compileItem(MyApp.todos[i]);
    list.append(newItem);
  }
}

MyApp.addToList = function(list, item) {
    var itemObject = {toDo: item.val()};
    MyApp.todos.push(itemObject);
    var compiledItem = MyApp.compileItem(itemObject)
    list.append(compiledItem);
    $('#new-thing').val('');
}


$(function() {

  var $thingList = $('#fav-list'),
      $button = $('#new-thing-button');

  MyApp.populateList($thingList);

  /************************* Event Handlers *************************/

  $button.on('click', function(event) {
    event.preventDefault();
    var $newItemText = $('#new-thing');
    if($newItemText.val())
      MyApp.addToList($thingList, $newItemText);
  });

  // Hover events for each list item in the to-do list. On hovering an element, its siblings get an inactive class applied
  $thingList.on('mouseenter mouseleave', 'li', function(event) {
    if (event.type == 'mouseenter') {
       $(this).removeClass('inactive');
       $(this).siblings().addClass('inactive');

    } else if (event.type == 'mouseleave') {
        $(this).siblings().removeClass('inactive');
    }
  });

  $thingList.on('click', 'a.complete', function(e) {
    e.preventDefault();
    var listItem = $(this).parent('li');
    listItem.toggleClass('completed');
  });

  /************************* End Event Handlers *************************/
});
