# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Asynchronous JavaScript and Callbacks

| Timing | Type | Topic |
| --- | --- | --- |
| 10 min | [Opening](#opening) | Introduction to Asynchronous JavaScript |
| 15 min | [Recap](#recap) | Anonymous Functions and Functions as First-Class Objects: Recap |
| 60 min | [Codealong](#codealong1) | Functions as First-Class Objects |
| 30 min | [Codealong](#codealong2) | Functions and Callbacks: Independent Practice |
| 30 min | [Codealong](#codealong3)  | Anonymous Functions and IIFEs  |
| 30 min | [Lab](#lab2) | IIFE: Independent Practice  |
| 5 min |  [Conclusion](#conclusion)| Homework, Final Questions & Exit Tickets |


### Objectives
*After this lesson, you will be able to:*

- Store and use anonymous functions in variables.
- Pass functions as arguments to functions that expect them.
- Write functions that take other functions as arguments.
- Return functions from functions.

### Preparation
*Before this lesson, you should already be able to:*

- Implement an AJAX request with vanilla JS.
- Reiterate the benefits of separation of concerns – API vs. Client.
- Understand the difference between function declarations and function expressions.
- Understand scope and hoisting.

<a name = "opening"></a>
## Introduction to Asynchronous JavaScript

As our programs start relying on user input/behavior and data that might not be available right away, we need to increasingly start thinking about manipulating our program behavior spread out over a period of time. We refer to this "now and later" programming as asynchronous programming. Believe it or not, we have already used asynchronous programming in our code in previous lessons:

- We have listened for click and mouse events that execute certain code when that event is complete.
- We have waited for a return from an AJAX call, and we have executed code for success and error scenarios.

Although we have used asynchronous programming in our code, we have not discussed _how_ this is all happening. Before we can truly understand how asynchronous programming works in JavaScript, we need to take a deeper look at functions and scope.

---
<a name = "recap"></a>
## Anonymous Functions and Functions as First-Class Objects: Recap

We have worked with numerous scenarios where we have run a block of code after a user has performed an action. Take the following scenario from our DOM and jQuery  lesson:

```js
  var $thingListItems = $('#fav-list');

  $thingList.on('mouseleave', 'li', function(e) {
    ...
  });
```

Taking a close look at the jQuery `on()` method, we notice two very important  concepts:

1. The `on()` method is taking a function as one of its parameters.
2. The function we are passing into the `on()` method does not have a name - its an anonymous function.

The function does not need a name, because we are not referring to it in a function call at this point. We are just handing it over to the on() function.
The on() function receives it into a parameter, much like a function expression.

The following is a function expression:

```js
  var handler = function(e) {
    ...
  });
```

The handler variable now contains the function, and we can call the function by referring to the handler variable:

```js
  var event = {};

  handler(event);
```

---
<a name = "codealong1"></a>
##  Functions as First-Class Objects

Functions as "first-class objects" is one of JavaScript's most powerful features. It allows us to:
- pass functions as parameters
- store them in variables (function expressions)
- return them from other functions
- just run them ad-hoc without the need to define anything

A function that takes another function or returns a function is called a `higher-order function`.

In the above example we saw a function being passed as a jQuery event handler, but JavaScript also has a plethora of builtin functions that allow us to pass functions as parameters. Let's take a look at the setTimeout function:

```js
  setTimeout( function(){
      console.log( "Hello world" );
  }, 1000 );
```

In this example setTimeout is taking a function as its first parameter, and the delay (in milliseconds) as its second parameter. The syntax for defining our own function that takes a function parameter is not any different than the syntax of a function that takes a normal data type argument:

```js
  var countDown = function() {
    var counter;
    for(counter = 3; counter > 0; counter--) {
      console.log(counter);
    }
  }

  function launchRocket(countDownFn, rocketName) {
    countDownFn();

    function printRocketMessage() {
      console.log( "Launching " + rocketName);
    }

    printRocketMessage();
  }

  launchRocket(countDown, "Falcon");
```

The above should all look familiar. There is however one thing to note with the printRocketMessage. This is referencing the `rocketName` argument that's defined on its parent's scope. Although this is not different from overall scope that we've already covered, this piece of functionality of a function keeping reference to variables from parent scope, even when parent has returned, is called a _closure_. We will cover closures in more detail in a future lesson.

Nomenclature: **callbacks**. It's important to understand the nomenclature around the above example, as this will become a fundamental pattern in our asynchronous programming. The function being passed into `launchRocket` is acting as a `callback`, because it serves as the target for the event loop to call back into the program, whenever the item in the queue is processed.

Callback functions can also take arguments, even though we don't specify the need for arguments when we're passing in the function expression variable:

```js
  var countDown = function(verb) {
    var counter;
    for(counter = 3; counter > 0; counter--) {
      console.log(verb + ": " + counter);
    }
  }

  function launchRocket(countDownFn, rocketName) {
    countDownFn("Counting");
  }

  launchRocket(countDown, "Falcon");
```

In the above example, countDown is the function expression variable. It holds a function that accepts one argument (verb). When we call launchRocket, we pass in the function expression variable as an argument to launchRocket. At that point, we don't specify the arguments to the countDown function. The function expression lands in the countDownFn parameter of launchRocket. When launchRocket calls countDownFn, thats when the argument is passed in to the function that was held in the countDown function expression. That argument ends up in the verb parameter.


Just like we can pass functions as parameters, we can also return functions:

```js
  var countDown = function() {
    var counter;
    for(counter = 3; counter > 0; counter--) {
      console.log(counter);
    }
  }

  function launchRocket(countDownFn, rocketName) {
    countDownFn();

    return function() {
      console.log("Launching " + rocketName);
    }
  }

  var firstRocket = launchRocket(countDown, "Falcon");
  firstRocket();

  var secondRocket = launchRocket(countDown, "Dragon");
  secondRocket();
```

The above pattern of returning functions allows our functions and callbacks to become more powerful in that we can generate much more dynamic and flexible functions.

---

<a name = "codealong2"></a>
## Functions and Callbacks:

Open the [main.js](starter-code/functions-callbacks-exercise/js/main.js) file.

- Write a function, `makeCountWhereTrue()`, that returns a function returning the number of odd integers in an array.
- `makeCountWhereTrue()` should take a predicate/filter function and return a function, allowing us to pass in an array of numbers.

---

<a name = "codealong3"></a>
## Anonymous Functions and IIFEs

By this point we have seen various examples of function expressions being passed as callback parameters. Taking the first setTimeout example:

```js
  setTimeout( function(){
      console.log( "Hello world" );
  }, 1000 );
```

The above is called an **anonymous function expression** because the function we're passing into `setTimeout()` has no name identifier in it. This is important to understand that function expressions can be anonymous, but function declarations cannot omit the name.

Although it is perfectly legal for us to use anonymous function expressions, and many examples take advantage of them them, including ones we have used up to date, we need to set a new best practice in place. As we increasingly work with function expressions, we should from this point on start naming all of our function expressions because it makes it much easier to stack trace and our code becomes much more readable. So let's change the above code to no longer be an anonymous function:

```js
  setTimeout( function timer(){
      console.log( "Hello world" );
  }, 1000 );
```

**Invoking Function Expressions Immediately**

We have the ability to execute our function expressions as soon as they are declared. This pattern has become so commonplace, that the JS community gave it a name: Immediately-invoked function expressions (IIFE - pronounced "iffy"). We are familiar with this syntax:

```js
  var countDown = function() {
    var counter;
    for(counter = 3; counter > 0; counter--) {
      console.log(counter);
    }
  }
```

We can transform this to an IIFE and execute the function expression immediately by adding parenthesis at the end of the expression:

```js
  var countDown = function() {
    var counter;
    for(counter = 3; counter > 0; counter--) {
      console.log(counter);
    }
  }();
```

Note that we need to add a semicolon at the end of IFFEs.

IIFEs are just functions, so we can also pass arguments to them:

```js
  var counterStartPoint = 3;

  (function countDown( global ){
    var counter;
    for(counter = global.counterStartPoint; counter > 0; counter--) {
      console.log(counter);
    }

  })( window );

  console.log( counterStartPoint ); // 3
```

The above example highlights a common stylistic practice. Although IIFEs are commonly used with global variables, the dependancies used within the IIFE are often passed in as parameters to eliminate the reliance on global variables.

---
<a name = "lab2"></a>
## IIFE: Independent Practice

Open the [main.js](starter-code/iife-exercise/js/main.js) file.

- Write an IIFE function that takes a duration (in seconds) as an argument.
- The function will automatically execute and display a count at every second until the specified duration.
- Use the setTimeout function to count up.
- Hint: a second is the duration passed * 1000 (milliseconds).

---

<a name = "conclusion"></a>
## Conclusion
Callbacks and closures are the bread and butter of asynchronous programming. Looking back at our DOM and APIs lessons, our interfaces update on user interactions and/or once we receive data from remote locations. Best practices in JS call for these reactions to be handled in the form of callbacks.

Callbacks, closures, and IIFEs allow us to better organize our code for each scenario, as well as make our functions significantly more dynamic.

**Optional homework:** If you want an additional challenge can try to complete [this series of functional-programming JavaScript exercises](http://reactivex.io/learnrx/). Some of these exercises use methods and syntax that we haven't covered in class and which you will likely need to look up on your own.

#### Further Resources

- [Functions are first class objects in javascript][1]
- [MDN: Declaring and using callbacks][2]
- [Demystifying JavaScript Closures, Callbacks and IIFEs][3]

[1]: http://helephant.com/2008/08/19/functions-are-first-class-objects-in-javascript/
[2]: https://developer.mozilla.org/en-US/docs/Mozilla/js-ctypes/Using_js-ctypes/Declaring_and_Using_Callbacks
[3]: http://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/
