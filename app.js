'use strict';

var productImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
var productsArray = [];
var counter = 0;

var chartData = {
  type: 'bar',
  data: {
    labels: productImageNames, //this will hold the name of each product
    datasets: [{
      label: '# of Votes',
      data: [],  //this will hold the votes for each product image
      //myChart.update (built in method) myChart.data.datasets[0].data[0] = 8;
      //data arrat should match the productImages array index
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',  //create a color property in constructor for each object? or... assign at render
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
}
//constructor to create products and push them into the productsArray array
function Product(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
  productsArray.push(this);
  chartData.data.datasets[0].data.push(this.votes);
}
// a simple IIFE to build all the product objects
(function() {
  // for (var i = 0; i < productImageNames.length; i++)
  for (var i in productImageNames){
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
    // for (var i = 0; i < productsArray.length; i++)
    for (var i in productsArray) {
      if (productsArray[i].name === event.target.id) {
        productsArray[i].votes++;
        myChart.data.datasets[0].data[i]++;
        myChart.update();

// this deletes the pictures once one is clicked on
        var images = document.getElementsByTagName('img');
        while(images.length > 0) {
          images[0].parentNode.removeChild(images[0]);
        }

// this gets a new set of pictures until 15 votes have been made. At this point, the eventlistener is shut off.
        tracker.renderImgsToDom();
        console.log('votes', productsArray[i].votes);
        console.log('chart', myChart.data.datasets[0].data[i]++);
        if (counter === 15) {
          document.getElementById("pictureHolder").removeEventListener("click",tracker.tallyVoteCounter);
          document.getElementById('results').addEventListener('click', tracker.renderResults);
        }
      }
    }
    console.log('event: ', event.target.id);

  },
//this will render the results when the html button is clicked.
  renderResults: function() {
    var getUl = document.getElementById('rendered-results');
    for (var i in productsArray) {
      var li  = document.createElement('li');
      li.textContent = 'The ' + productsArray[i].name + ': ' + productsArray[i].votes + ' votes.';
      getUl.appendChild(li);
    }
  }
}

var ctx = document.getElementById("myChart").getContext("2d");

var myChart = new Chart(ctx, chartData);

















document.getElementById('pictureHolder').addEventListener('click', tracker.tallyVoteCounter);
tracker.renderImgsToDom();
