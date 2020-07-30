// Functions

// const obj1 = { id: 1, fn: function() { return this.id }};
// const obj2 = { id: 2, fn: obj1.fn};
// console.log('obj1.fn()', obj1.fn());
// console.log('obj2.fn()', obj2.fn());

// function fnCall() {
//   return this.id;
// }
// const obj1 = { id: 1 };
// const obj2 = { id: 2 };
// console.log('fnCall.call(obj1)', fnCall.call(obj1));
// console.log('fnCall.call(obj2)', fnCall.call(obj2));

// function fn() {
//   return (offset) => this.id + offset;
// }
// const obj = { id: 999 }
// const offsetter = fn.call(obj);
// console.log('offsetter(1)', offsetter(1));

// function normalFn() {};
// const lambdaFn = () => {};
// console.log('typeof normalFn.prototype', typeof normalFn.prototype);
// console.log('typeof lambdaFn.prototype', typeof lambdaFn.prototype);

// const wolf = {
//   howl: function() { console.log(this.name + ': awoooo')}
// };
// const dog = Object.create(wolf, {
//   woof: { value: function() { console.log(this.name + ': woof')}}
// });
// const rufus = Object.create(dog, {
//   name: { value: 'This is Rufus'}
// });
// rufus.woof();
// rufus.howl();

// const wolf = {
//   howl: function() { console.log(this.name + ': awoooo')}
// };
// const dog = Object.create(wolf, {
//   woof: { value: function() { console.log(this.name + ': woof')}}
// });
// function createDog(name) {
//   return Object.create(dog, {
//     name: { value: `${name} the dog:` }
//   })
// }
// const rufus = createDog('rufus');
// rufus.woof();
// rufus.howl();
// console.log(Object.getPrototypeOf(rufus) === dog);
// console.log(Object.getPrototypeOf(dog) === wolf);


// function Wolf (name) {
//   this.name = name;
// }
// Wolf.prototype.howl = function() {
//   console.log(this.name + ': awoooo');
// }
// function Dog(name) {
//   Wolf.call(this, name + ' the dog');
// }
// function inherit (proto) {
//   function ChainLink() {}
//   ChainLink.prototype = proto;

//   return new ChainLink();
// }
// Dog.prototype = inherit(Wolf.prototype);
// Dog.prototype.woof = function() {
//   console.log(this.name + ': woof');
// }
// const rufus = new Dog('rufus');
// rufus.woof();
// rufus.howl();
// console.log(Object.getPrototypeOf(rufus) === Dog.prototype);
// console.log(Object.getPrototypeOf(Dog.prototype) === Wolf.prototype);

// function Wolf (name) {
//   this.name = name;
// }
// function Dog (name) {
//   Wolf.call(this, "this the dog" + name);
// }
// Dog.prototype = Object.create(Wolf.prototype);
// console.log(Object.getPrototypeOf(Dog.prototype) === Wolf.prototype);

// // NOT WORKING
// const util = require('util');
// function Wolf (name) {
//   this.name = name;
// }
// Wolf.prototype.howl = function() {
//   console.log(this.name + ": awooo");
// }
// function Dog (name) {
//   Wolf.call(this, name + " the dog")
// }
// Dog.prototype.woof = function() {
//   console.log(this.name + ": woof");
// }
// util.inherits(Dog.prototype, Wolf.prototype);
// rufus = new Dog('rufus');
// rufus.woof();
// rufus.howl();


class Wolf {
  constructor(name) {
    this.name = name;
  }

  howl() {
    console.log(this.name + ": awooo");
  }
}
class Dog extends Wolf {
  constructor(name) {
    super(name + " the dog");
  }

  woof() {
    console.log(this.name + ': woof');
  }
}
const rufus = new Dog('rufus');
rufus.woof();
rufus.howl();
console.log(Object.getPrototypeOf(rufus) === Dog.prototype);
console.log(Object.getPrototypeOf(Dog.prototype) === Wolf.prototype);
