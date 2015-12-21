// second post
var car = new Object();
car.type = "sedan";
car.brand = "BMW";
car.topVelocity = 261;

// this is perfectly possible with objects.. but you will run into problems when you do that with primitive types

var array = new Array(23,34); // array anti pattern output [23,34]
var array = new Array(23); // output [ , , , , , , , , , , , , , , , , , , , , , , ]

// go on with what is supposed to be a best practice for pattern with object literals
// JSON notation style
var car = {
    "type":"sedan",
    "brand":"BMW",
    "topVelocity":261
}

var array = [23,24] // output [23,24]
var array = [23] // output [23]

var myObj={
    'varOne':'One',
    'methodOne':function(){ alert('methodOne has been called!')}
}
myObj.methodOne();