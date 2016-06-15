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
  for (var i=0; i < MyApp.todos.length; ++i) {
    var newItem = MyApp.compileItem(MyApp.todos[i]);
    list.append(newItem);
  }
}


$(function() {

  var $thingList = $('#fav-list'),
      $button = $('#new-thing-button');

  MyApp.populateList($thingList);

});
