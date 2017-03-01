var ctx = document.getElementById("myChart").getContext("2d");

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], //this will hold the name of each product
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],  //this will hold the votes for each product image
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
});
