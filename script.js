$(function() {
	var $error = $('#error');
	var $location = $('#location');
	var $icon = $('#icon');
	var $description = $('#description');
	var $temperature = $('#temperature');
	var $details = $('#details');
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
				$error.html('<h2>Error while loading data</h2>');
			}
		});
	  });
	} else {
		$error.html('<h2>We could not read your location</h2>');
	}

	// renders HTML
	function rendHTML(data) {
		$location.html('<h1 class="cover-heading">' + data.name + '</h1>');
		$description.html('<h3 class="lead">'+ data.weather[0].main + '</h3>');
		$icon.html('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">');
		celsius = data.main.temp;
		$temperature.html('<p class="lead">' + data.main.temp + '°C</p>');
		$details.html('<p class="lead">humidity: ' + data.main.humidity + '%, wind: ' + data.wind.speed + ' m/sec</p>');
	};

	// change units to imperial and back
	$temperature.on('click', function() {
		if (degrees == 'C') {
			var fahrenheit = Math.floor(celsius * 9/5 + 32);
			$temperature.html('<p class="lead">' + fahrenheit + '°F</p>');
			degrees = 'F';
		} else {
			$temperature.html('<p class="lead">' + celsius + '°C</p>');
			degrees = 'C';
		};
	});
});