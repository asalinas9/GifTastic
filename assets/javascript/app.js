$(document).ready(function() {
	var shows = [
		'Big Bang Theory',
		'Friends',
		'The Office',
		'That 70s Show',
		' Schitts Creek',
		'Brooklyn Nine-Nine'
	];

	//Adds buttons to current Arrays
	function renderButtons() {
		$('#show-buttons').empty();
		for (i = 0; i < shows.length; i++) {
			$('#show-buttons').append(
				"<button class='btn btn-success' data-show='" +
					shows[i] +
					"'>" +
					shows[i] +
					'</button>'
			);
		}
	}

	renderButtons();
	// Adds buttons for shows entered
	$('#add-show').on('click', function() {
		event.preventDefault();
		var show = $('#shows-input')
			.val()
			.trim();
		shows.push(show);
		renderButtons();
	});

	//API Call
	$(document.body).on('click', '.btn-success', function() {
		var show = $(this).attr('data-show');

		var queryURL =
			'https://api.giphy.com/v1/gifs/search?q=' +
			show +
			'&api_key=suEFpnmMoyjx9PkD8VCXJ91ok29AvTJl&limit=10';

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(response) {
			var results = response.data;
			$('#shows').empty();
			for (var i = 0; i < results.length; i++) {
				var showDiv = $('<div>');
				var p = $('<p>').text('Rating: ' + results[i].rating);
				var showImg = $('<img>');

				showImg.attr('src', results[i].images.original_still.url);
				showImg.attr('data-still', results[i].images.original_still.url);
				showImg.attr('data-animate', results[i].images.original.url);
				showImg.attr('data-state', 'still');
				showImg.attr('class', 'gif');
				showDiv.append(p);
				showDiv.append(showImg);
				$('#shows').prepend(showDiv);
			}
		});
	});

	function changeState() {
		var state = $(this).attr('data-state');
		var animateImage = $(this).attr('data-animate');
		var stillImage = $(this).attr('data-still');

		if (state == 'still') {
			$(this).attr('src', animateImage);
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', stillImage);
			$(this).attr('data-state', 'still');
		}
	}
	//makes gifs animate/still
	$(document).on('click', '.gif', changeState);
});
