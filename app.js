'use strict';
setItem
var productImageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
var productsArray = [];
var counter = 0;
var ctx = document.getElementById("myChart").getContext("2d");

//constructor to create products and push them into the productsArray array
function Product(name, path, color) {
  this.name = name;
  this.path = path;
  this.votes = 0;
  this.colors = color;
  this.views = 0;
  productsArray.push(this);
  //chartData and myChart are independent of one another so I had to restructure my dot notation here
  tracker.chartData.data.datasets[0].data.push(this.votes);
  tracker.chartData.data.datasets[0].backgroundColor.push(this.colors);
}


//where all the functionality is controlled from
var tracker = {
  randomNums: [],

  // this generates a random number between 0-18
  randNumberGenerator: function(){
    return Math.round(Math.random() * (productsArray.length - 1));
  },

  // this function pushes 3 randomly generated numbers into an array called randomNums
  chooseThreeRandomPics: function(){
    this.randomNums = [];
    while (this.randomNums.length < 3) {
      var possible = tracker.randNumberGenerator();
      if (this.randomNums.indexOf(possible) === -1) {
        this.randomNums.push(possible);
      }
    }
    return this.randomNums;
  },
  incViewsTotal: function(){
    for (var i in tracker.chooseThreeRandomPics()) {
      productsArray[tracker.randomNums[i]].views++;
    }
  },
  // this is where the the images are rendered into img selection area of the page
  renderImgsToDom: function(){
    var threeRandomIndices = tracker.chooseThreeRandomPics();
    tracker.incViewsTotal();
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
    tracker.setPics();
    console.log('counter', counter);
    for (var i in productsArray) {
      if (productsArray[i].name === event.target.id) {
        productsArray[i].votes++;
        tracker.chartData.data.datasets[0].data[i]++;
        tracker.chartOne.update();
        console.log(productsArray[i].name, productsArray[i].votes);
      }
    }
  },

  deletePics: function(){
    // this deletes the pictures once one is clicked on
    var images = document.getElementsByTagName('img');
    while(images.length > 0) {
      images[0].parentNode.removeChild(images[0]);
    }
  },

  setPics: function(){
    // this gets a new set of pictures until 15 votes have been made. At this point, the eventlistener is shut off.
    tracker.deletePics();
    tracker.renderImgsToDom();
    if (counter === 15) {
      console.log('counter in setPics', counter);
      localStorage.setItem('finishedProductArray', JSON.stringify(productsArray));
      localStorage.setItem('chartDataArray', JSON.stringify(tracker.chartData.data.datasets[0].data));
      document.getElementById("pictureHolder").removeEventListener("click",tracker.tallyVoteCounter);
      document.getElementById('results').addEventListener('click', tracker.renderResults);
    }
  },

  renderResults: function() {
    var getUl = document.getElementById('rendered-results');
    for (var i in productsArray) {
      var li  = document.createElement('li');
      li.textContent = 'The ' + productsArray[i].name + ': ' + productsArray[i].votes + ' votes.';
      getUl.appendChild(li);
    }
  },

  dynamicColors: function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return'rgb(' + r +',' + g +',' + b +')';
  },

// added chartData to my tracker object on a global scale nothing changed here other than removing a var
  chartData: {
    type: 'bar',
    data: {
      labels: productImageNames, //this will hold the name of each product
      datasets: [{
        label: '# of Votes',
        data: [],  //this will hold the votes for each product image
        //myChart.update (built in method) myChart.data.datasets[0].data[0] = 8;
        //data arrat should match the productImages array index
        backgroundColor: [],
        borderColor: 'black',
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
  },

  // this is where my chart is being generated
  generateChart: function(){
    // chartData and ctx are being assigned to the var myChart
    var myChart = new Chart(ctx, tracker.chartData);
    // myChart is being assigned to chartOne so that new votes can be updated on each click
    tracker.chartOne = myChart;
  },

  chartOne: null,

  getOldProductArrayVotesAndViews : function(){
    var stringProducts = localStorage.getItem('finishedProductArray');
    var loadedProducts = JSON.parse(stringProducts);
    for (var i in loadedProducts){
      productsArray[i].votes = loadedProducts[i].votes;
      productsArray[i].views = loadedProducts[i].views;
    }
  },

};



// a simple IIFE to build all the product objects
(function() {
  // for (var i = 0; i < productImageNames.length; i++)
  for (var i in productImageNames){
    var newInstances = new Product(productImageNames[i], 'img/' + productImageNames[i]+'.jpg', tracker.dynamicColors())
  };
  tracker.getOldProductArrayVotesAndViews();
  console.log(productsArray);
})()
tracker.generateChart();

document.getElementById('pictureHolder').addEventListener('click', tracker.tallyVoteCounter);
tracker.renderImgsToDom();
