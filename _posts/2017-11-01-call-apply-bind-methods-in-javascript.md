---
layout: post
title: Call(), Apply() and Bind() Methods in JavaScript.
author: monika
tags: ['javascript', 'bind', 'apply', 'call']
hidden: false
comments: true
---

Working with JavaScript “this” keyword can be tricky. Not knowing the background rules may end up with the famous “it works, but I don’t know why” or worse: “it doesn’t work and I don’t know why”. It’s good to know the theory before putting things into practice. Call(), Apply() and Bind() methods can come in handy when setting the “this” value.


## Basic rules worth remembering:

1. “This” always refers to an object.

2. “This” refers to an object which calls the function it contains.

3. In the global context “this” refers to either window object or is undefined if the ‘strict mode’ is used.


I would like to focus on the first two rules specifically.

```javascript
var car = { 
    registrationNumber: "GA12345",
    brand: "Toyota",

    displayDetails: function(){
        console.log(this.registrationNumber + " " + this.brand);
    }
}
```

The above will work perfectly fine as long as we use it this way:

```javascript
car.displayDetails()
```

But what if we want to borrow a method?

```javascript
var myCarDetails =  car.displayDetails;
myCarDetails()
```

Well, this won’t work as the “this” will be now assigned to the global context which doesn’t have neither the registrationNumber nor the brand property. 

##The Bind() Method

For such cases we can use the ECMAScript 5 bind() method of the Function.prototype property. This means bind() can be used by every single function. 

```javascript
var myCarDetails = car.displayDetails.bind(car)
myCarDetails()
```

The bind() method creates a new function where “this” refers to the parameter in the parenthesis in the above case “car”. This way the bind() method enables calling a function with a specified “this” value.

What if we would like to pass a parameter to the displayDetails function? We can use the bind method again. The following argument of the bind() method will provide an argument to the function bind() is called on. 

Let me rewrite the car object:

```javascript
var car = { 
    registrationNumber: "GA12345",
    brand: "Toyota",

    displayDetails: function(ownerName){
        console.log(ownerName + ", this is your car: " + this.registrationNumber + " " + this.brand);
    }
}
```

Example of passing arguments with bind():

```javascript
var myCarDetails = car.displayDetails.bind(car, "Vivian")
```


##Call() and Apply() methods

Similar but slightly different usage provide the call() and apply() methods which also belong to the Function.prototype property. 

This time there is a car object without the displayDetails function, which is located in the global context.

 ```javascript
 var car = { 
            registrationNumber: "GA12345",
            brand: "Toyota"
        }

function displayDetails(ownerName){
               console.log(ownerName + ", this is your car: " + this.registrationNumber + " " + this.brand);
```

We can use the apply() function:

```javascript
displayDetails.apply(car, ["Vivian"])
```

Or

```javascript
displayDetails.call(car, "Vivian")
```

Note that when using the apply() function the parameter must be placed in an array. Call() accepts both an array of parameters and a parameter itself. Both are great tools for borrowing functions in JavaScript. 

Bind(), call() and apply() functions can make your life easier when you need to set the value of ‘this’. 
Hope the post was helpful. Have a happy day and enjoy the coding!









