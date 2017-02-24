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
  // build the objects
})()

var tracker = {
  // lots of properties and methods
}

someEl.addEventListener('click', function(e) {
  // does some stuff on click
})
