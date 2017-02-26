'use strict';

var productImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
var productsArray = [];
var counter = 0;
//constructor to create products and push them into the productsArray array
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

//where all the functionality is controlled from
var tracker = {
// this generates a random number between 0-18
  randNumberGenerator: function(){
    return Math.round(Math.random() * (productsArray.length - 1));
  },
// this function pushes 3 randomly generated numbers into an array called randomNums
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
// this is where the the images are rendered into img selection area of the page
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
// this is where the vote and counter are added on click event
  tallyVoteCounter: function(event){


    counter += 1;
    console.log('counter', counter);
    for (var i = 0; i < productsArray.length; i++) {
      if (productsArray[i].name === event.target.id) {
        productsArray[i].votes++;
// this deletes the pictures once one is clicked on
        var images = document.getElementsByTagName('img');
        while(images.length > 0) {
          images[0].parentNode.removeChild(images[0]);
        }

// this gets a new set of pictures until 15 votes have been made. At this point, the eventlistener is shut off.
        tracker.renderImgsToDom();
        console.log('votes', productsArray[i].votes);
        if (counter === 15) {
          document.getElementById("pictureHolder").removeEventListener("click",tracker.tallyVoteCounter);
        }
      }
    }
    console.log('event: ', event.target.id);

  },
//this will render the results when the html button is clicked.
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
