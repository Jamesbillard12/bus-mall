'use strict';
// 1. Generate three random, non-dupe images (part of the controller)
// 2. Object constructor for Products:
// a. Include name, path, votes
// 3. A tracker object that will controll functionality of app
// 4. Event listener(s) for image clicks

var productImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
var productsArray = [];
var counter = 0;

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
  productsArray.push(this);
}
// a simple IIFE to build all the product objects
(function() {
  for (var i = 0; i < productImageNames.length; i++) {
    var newInstances = new Product(productImageNames[i], 'img/' + productImageNames[i]+'.jpg')
  };
  console.log(productsArray);
})()


var tracker = {

  randNumberGenerator: function(){
    return Math.round(Math.random() * (productsArray.length - 1));
  },

  chooseThreeRandomPics: function(){
    var randomNums = [];

    while (randomNums.length < 3) {
      var possible = tracker.randNumberGenerator();
      if (randomNums.indexOf(possible)=== -1) {
        randomNums.push(possible);
      }
    }
    return randomNums;
  }
  renderImgsToDom: function(){
    var threePics = tracker.chooseThreeRandomPics();
    var getDivZero = document.getElementById('zero');
    var img = document.createElement('img');
    img.src = productsArray[randomNums].path;
    img.id = productsArray[randomNums].name;
    zero.appendChild(img);
    console.log(zero);
  }


}

//   do {
//
//     var images = document.getElementsByTagName('img');
//     while(images.length > 0) {
//       images[0].parentNode.removeChild(images[0]);
//     }
//
//
//     var num0 = Math.round(Math.random() * (productsArray.length - 1));
//     console.log(num0);

//
//
//     document.getElementsByTagName('img')[0].setAttribute('id', 'IMGR0');
//     document.getElementsByTagName('img')[1].setAttribute('id', 'IMGR1');
//     document.getElementsByTagName('img')[2].setAttribute('id', 'productsArray[i].name');
//
//   } while (num0 === num1 || num0 === num2 || num1 === num2)
// }






// document.getElementById('zero').addEventListener('click', myFunction);
//
// function myFunction(){
//   counter++;
//   Product.votes++;
//   console.log(counter);
//
// }
