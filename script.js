
$(function() {
	var $output = $('.output');

	// first we grab data
	$.ajax( {
		url: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={id_goes_here}',
		success: function(data) {
			$output.append('<h3>' + data.name + '</h3>');
			$output.append('<p>'+ data.weather[0].main + '</p>');
			$output.append('<p>'+ data.weather[0].description + '</p>');
			// this I will need later to get the proper icon dispaying 
			$output.append('<p>Igonre this for now: '+ data.weather[0].icon + '</p>');
			$output.append('<p>Temperature: ' + data.main.temp + '</p>');
			$output.append('<p>Humidity: ' + data.main.humidity + '</p');
			$output.append('<p>Wind speed: ' + data.wind.speed + ' meters per second</p>');
		},
		error: function() {
			// change to search by city name
			$output.html('<p>Error while loading data</p>')
		}
	});
})

