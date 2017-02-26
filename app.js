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
      if (randomNums.indexOf(possible) === -1) {
        randomNums.push(possible);
      }
    }
    return randomNums;
  },

  renderImgsToDom: function(){
    console.log('tracker.renderImgsToDom');
    var threeRandomIndices = tracker.chooseThreeRandomPics();
    var pictureHolder = document.getElementById('pictureHolder');
    for (var i = 0; i < threeRandomIndices.length; i++) {

      var img = document.createElement('img');
      img.src = productsArray[threeRandomIndices[i]].path;
      img.id = productsArray[threeRandomIndices[i]].name;
      pictureHolder.appendChild(img);
    }
  },

  tallyVoteCounter: function(event){


    counter += 1;
    console.log('counter', counter);
    for (var i = 0; i < productsArray.length; i++) {
      if (productsArray[i].name === event.target.id) {
        productsArray[i].votes++;

        var images = document.getElementsByTagName('img');
        while(images.length > 0) {
          images[0].parentNode.removeChild(images[0]);
        }


        tracker.renderImgsToDom();
        console.log('votes', productsArray[i].votes);
        if (counter === 15) {
          document.getElementById("pictureHolder").removeEventListener("click",tracker.tallyVoteCounter);
        }
      }
    }
    console.log('event: ', event.target.id);

  },

  renderResults: function() {
    var getUl = document.getElementById('rendered-results');
    for (var i = 0; i < productsArray.length; i++) {
      var li  = document.createElement('li');
      li.textContent = 'The ' + productsArray[i].name + ': ' + productsArray[i].votes + ' votes.';
      getUl.appendChild(li);
    }
  }
}















document.getElementById('results').addEventListener('click', tracker.renderResults);
document.getElementById('pictureHolder').addEventListener('click', tracker.tallyVoteCounter);
tracker.renderImgsToDom();
