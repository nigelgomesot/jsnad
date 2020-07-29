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

const wolf = {
  howl: function() { console.log(this.name + ': awoooo')}
};
const dog = Object.create(wolf, {
  woof: { value: function() { console.log(this.name + ': woof')}}
});
function createDog(name) {
  return Object.create(dog, {
    name: { value: `${name} the dog:` }
  })
}
const rufus = createDog('rufus');
rufus.woof();
rufus.howl();
console.log(Object.getPrototypeOf(rufus) === dog);
console.log(Object.getPrototypeOf(dog) === wolf);
