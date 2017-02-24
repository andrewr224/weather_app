$(function() {
	var $error = $('#error');
	var $location = $('#location');
	var $icon = $('#icon');
	var $description = $('#description');
	var $temperature = $('#temperature');
	var $humidity = $('#humidity');
	var $wind = $('#wind');
	var $units = $('#units');
	var $btn = $('#btn');
	var degrees = 'C';

	var lat;
	var lon;
	var celsius;

	// we get location
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	  	lat = position.coords.latitude;
	  	lon = position.coords.longitude;

		// we grab data
		$.ajax( {
			url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid={id_goes_here}',
			success: function(data) {
				rendHTML(data);
			},

			// this may be better replaced with 'else', as we're in 'if' now
			error: function() {
				// change to search by city name
				$error.html('<h2>Error while loading data</h2>')
			}
		});
	  });
	}

	// renders HTML
	function rendHTML(data) {
		$location.html('<h1>' + data.name + '</h1>');
		$description.html('<h3>'+ data.weather[0].description + '</h3>');
		$icon.html('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">');
		celsius = data.main.temp;
		$temperature.html('<p>Temperature: ' + data.main.temp + '°C</p>');
		$humidity.html('<p>Humidity: ' + data.main.humidity + '</p');
		$wind.html('<p>Wind speed: ' + data.wind.speed + ' meters per second</p>');
	};

	// change units to imperial and back
	$btn.on('click', function() {
		if (degrees == 'C') {
			var fahrenheit = Math.floor(celsius * 9/5 + 32);
			$temperature.html('<p>Temperature: ' + fahrenheit + '°F</p>');
			$units.html('Celsius');
			degrees = 'F';
		} else {
			$temperature.html('<p>Temperature: ' + celsius + '°C</p>');
			$units.html('Fahrenheit');
			degrees = 'C';
		};
	});
});