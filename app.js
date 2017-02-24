// 1. Generate three random, non-dupe images (part of the controller)
// 2. Object constructor for Products:
// a. Include name, path, votes
// 3. A tracker object that will controll functionality of app
// 4. Event listener(s) for image clicks

var productImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
var productsArray = [];

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
  productsArray.push(this);
}

for (var i = 0; i < productImageNames.length; i++) {
  var newInstances = new Product(productImageNames[i], 'img/' + productImageNames[i]+'.jpg')
};
console.log(productsArray);

// a simple IIFE to build all the product images
(function() {
  var num0 = Math.floor(Math.random() * productsArray.length);
  console.log(num0);
  var getDivZero = document.getElementById('zero')
  var img0 = document.createElement('img');
  img0.src = productsArray[num0].path;
  console.log(productsArray[num0].path);
  zero.appendChild(img0);

  var num1 = Math.floor(Math.random() * productsArray.length);
  console.log(num1);
  var getDivOne = document.getElementById('one')
  var img1 = document.createElement('img');
  img1.src = productsArray[num1].path;
  console.log(productsArray[num1].path);
  zero.appendChild(img1);

  var num2 = Math.floor(Math.random() * productsArray.length);
  console.log(num2);
  var getDivOne = document.getElementById('two')
  var img2 = document.createElement('img');
  img2.src = productsArray[num2].path;
  console.log(productsArray[num2].path);
  zero.appendChild(img2);

})()

var tracker = {
  // lots of properties and methods
}

someEl.addEventListener('click', function(e) {
  // does some stuff on click
})
