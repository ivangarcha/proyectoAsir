
      
      var results = null;
        
      
      function refresh(){
	  $.ajax({
          url: "data.php",
	  dataSrc:"",
          dataType: "JSON",
          success: function (result) {
            google.charts.load("current", {
              packages: ["corechart"],
            });
            google.charts.setOnLoadCallback(function () {
	      results = result;
              drawChart();
		var tempMaxima = _.max(_.map(results, function(medicion){ return parseFloat(medicion.temperatura)}));
        	var tempMinima = _.min(_.map(results, function(medicion){ return parseFloat(medicion.temperatura)}));
		var last = _.last(_.sortBy(results, 'fecha'));
        	document.getElementById("tempMax").value = tempMaxima + "º";
        	document.getElementById("tempMin").value = tempMinima + "º";
		document.getElementById("lastTemperature").value = last.temperatura + "º";
		var humMaxima = _.max(_.map(results, function(medicion){ return parseFloat(medicion.humedad)}));
        	var humMinima = _.min(_.map(results, function(medicion){ return parseFloat(medicion.humedad)}));
        	document.getElementById("humMax").value = humMaxima + "%";
        	document.getElementById("humMin").value = humMinima + "%";
		document.getElementById("lastHumedity").value = last.humedad + "%";
            });
          },
        });
	  }

      function drawTemperatureChart(result) {
        data = new google.visualization.DataTable();
        data.addColumn("string", "fecha");
        data.addColumn("number", "temperatura");
        var dataArray = [];

        $.each(result, function (i, obj) {
          dataArray.push([obj.fecha, parseFloat(obj.temperatura)]);
        });
        data.addRows(dataArray);
        var options = {
          legend: "none",
          curveType: "function",
          colors: ["red"],
          title: "TEMPERATURA ºC",
        };
        var chart = new google.visualization.LineChart(
          document.getElementById("graphTemperature")
        );
        chart.draw(data, options);
      }

      function drawHumedityChart(result) {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "fecha");
        data.addColumn("number", "humedad");
        var dataArray = [];

        $.each(result, function (i, obj) {
          dataArray.push([obj.fecha, parseInt(obj.humedad)]);
        });
        data.addRows(dataArray);
        var options = {
          legend: "none",
          title: "HUMEDAD %",
          curveType: "function",
        };
        var chart = new google.visualization.LineChart(
          document.getElementById("graphHumedity")
        );$(window).resize(function(){
		console.log('Hola');
  		drawTemperatureChart();
	});
        chart.draw(data, options);
      }

      function drawChart() {
        drawTemperatureChart(results);
        drawHumedityChart(results);
      }
      
      refresh();
	  var interval = setInterval(refresh, 60000)
      
