mapboxgl.accessToken = 'pk.eyJ1IjoiZGVya2FjaCIsImEiOiJjanFjdWFzeGozejZnNDNvYmpsbXR1azJzIn0.03a1jcE5orWtncfaDCxuPA';

$(document).ready(function () {
	
	let marker = null;
	let markerArray = [];	

	$(`a.dropdown-item[data-index=${$('#weathermap').attr('data-zoom')}]`).addClass("selected");
	$(`a.dropdown-item[data-style=${($('#weathermap').attr('data-map-style')).replace('mapbox://styles/mapbox/', '').replace('-v9', '')}]`).addClass("selected");
	$(`a.dropdown-item[data-rotation=${$('#weathermap').attr('data-map-rotation')}]`).addClass("selected");
	$(`a.dropdown-item[data-language=${$('#weathermap').attr('data-language')}]`).addClass("selected");
	$(`a.dropdown-item[data-color='${$('#weathermap').attr('data-marker-color')}]'`).addClass("selected");
	$(`a.dropdown-item[data-draggable=${$('#weathermap').attr('data-marker-draggable')}]`).addClass("selected");

	let map = new mapboxgl.Map({
		container: 'map-currentweather', // container id
		style: $('#weathermap').attr('data-map-style'),
		center: [parseFloat($('#weathermap').attr('data-longitude')), parseFloat($('#weathermap').attr('data-latitude'))], // starting position
		zoom: $('#weathermap').attr('data-zoom') // starting zoom
	});

	// create the marker with the popup
	CreatePopup(marker, parseFloat($('#weathermap').attr('data-latitude')), parseFloat($('#weathermap').attr('data-longitude')), markerArray, map);

	// creating context menu
	map.on('mousedown', function (e) {

		if (event.which == 3) {
			coordX = e.lngLat.lng;
			coordY = e.lngLat.lat;
			$('#weathermap').attr('data-coordx', e.lngLat.lng);
			$('#weathermap').attr('data-coordy', e.lngLat.lat);

			$(".custom-menu").remove();

			$("body").append("<ul class='custom-menu' style=\"list-style-type:none\"><li data-action=\"create\">Create marker</li>"
				+ "<li data-action=\"close\">Close context menu</li></ul>")

		}
	});

	// parsing data from the point of the cursor and changing type of cursor
	map.on('mousemove', function (e) {
		var features = map.queryRenderedFeatures(e.point);
		if (typeof features[0] !== typeof undefined) {
			//let cityName = features[0].properties.name_en;
			let placeType = features[0].properties.type;


			if (placeType == "city" || placeType == "town" || placeType == "village") {
				map.getCanvas().style.cursor = 'crosshair';
				placeType += " ";
			}
			else {
				map.getCanvas().style.cursor = 'grab';
				placeType = "";
			}

			$('#weathermap').attr('data-placetype', placeType);
			$('#weathermap').attr('data-cityname', features[0].properties.name_en);
		}
	});

	$(document).bind("contextmenu", function (event) {

		// Avoid the real one
		event.preventDefault();

		// Show contextmenu
		$(".custom-menu").finish().toggle(100).

			// In the right position (the mouse)
			css({
				top: event.pageY + "px",
				left: event.pageX + "px"
			});
	});


	$(document).bind("mousedown", function (e) {

		// If the clicked element is not the menu
		if (!$(e.target).parents(".custom-menu").length > 0) {

			// Hide it
			$(".custom-menu").hide();
		}
	});

	// clicking on the marker
	$(document).on("mousedown", "svg", function (event) {
		let jObj = $(this);
		let paren = jObj.parent();
		let styl = paren.attr("style");
		let pxArr = GetMarkerPoint(styl);
		$('#weathermap').attr('data-marker-centerX', parseInt(pxArr[0]));
		$('#weathermap').attr('data-marker-centerY', parseInt(pxArr[1]));
		$(".custom-menu").remove();
		$("body").append("<ul class='custom-menu' style=\"list-style-type:none\"><li data-action=\"delete\">Delete the marker</li><li data-action=\"popup\">Weather popup</li><li data-action=\"close\">Close context menu</li></ul>");
	});


	function GetMarkerPoint(styleString) {
		let arr = styleString.split(';');
		let index = arr[0].lastIndexOf('translate(');
		let sub = styleString.substring(index, arr[0].length);
		sub = sub.replace('translate(', '');
		sub = sub.replace(')', '');
		let coordinatesArr = sub.split(', ');
		return coordinatesArr;
	}

	//click to find out about this app or return to app
    $(document).on("click", "#secondPage-weather", function () {

		let jObj = $(this);
		let myText = jObj.text();


		if (myText == "About programm") {
			jObj.text("Back home");
			$('#weathermap').css('display', 'none');
			$('#about').css('display', 'block');
			$('#mapSetting-weather').css('visibility', 'hidden');

		}
		else if (myText == "Back home") {
			jObj.text("About programm");
			$('#about').css('display', 'none');
			$('#weathermap').css('display', 'block');
			$('#mapSetting-weather').css('visibility', 'visible');
		}
	});


	// clicking of the menu item
	$(document).on("click", "a.dropdown-item", function () {

		let jObj = $(this);
		let attribute = jObj.attr("data-index");

		if (typeof attribute !== typeof undefined && attribute !== false) {

			let myZoom = +attribute;
			map.setZoom(myZoom);
		}

		attribute = jObj.attr("data-style");

		if (typeof attribute !== typeof undefined && attribute !== false) {
			let myStyle = 'mapbox://styles/mapbox/' + attribute + '-v9';
			$('#weathermap').attr('data-map-style', myStyle);
			map.setStyle(myStyle);
			map.addControl(new MapboxLanguage({
				defaultLanguage: $('#weathermap').attr('data-language')
			}));
		}

		attribute = jObj.attr("data-rotation");

		if (typeof attribute !== typeof undefined && attribute !== false) {

			if (attribute == "true") {
				map.dragRotate.enable();								
			}
			else {
				map.dragRotate.disable();				
			}

			$('#weathermap').attr('data-map-rotation', attribute);
		}

		attribute = jObj.attr("data-language");

		if (typeof attribute !== typeof undefined && attribute !== false) {

			$('#weathermap').attr('data-language', attribute);
			let myZoom = map.getZoom();

			map = new mapboxgl.Map({
				container: 'map-currentweather',
				style: $('#weathermap').attr('data-map-style'),
				center: [parseFloat($('#weathermap').attr('data-longitude')), parseFloat($('#weathermap').attr('data-latitude'))], 
				zoom: myZoom
			});

			map.addControl(new MapboxLanguage({
				defaultLanguage: $('#weathermap').attr('data-language')
			}));

			for (let i = 0; i < markerArray.length; i++) {
				marker = markerArray[i];
				marker.addTo(map);
			}

			let mapRotation = $('#weathermap').attr('data-map-rotation');

			if (mapRotation == "true") {
				map.dragRotate.enable();
			}
			else {
				map.dragRotate.disable();
			}
		}

		attribute = jObj.attr("data-color");

		if (typeof attribute !== typeof undefined && attribute !== false) {
			$('#weathermap').attr('data-marker-color', attribute);
		}

		attribute = jObj.attr("data-draggable");

		if (typeof attribute !== typeof undefined && attribute !== false) {			
			$('#weathermap').attr('data-marker-draggable', attribute)
		}

		jObj.parent().children().removeClass("selected");
		jObj.addClass("selected");
	});

	// clicing of the context menu item
	$(document).on("click", "li", function (e) {

		let jObj = $(this);
		let attribute = jObj.attr("data-action");
		let markerCenterX = +$('#weathermap').attr('data-marker-centerX');
		let markerCenterY = +$('#weathermap').attr('data-marker-centerY');

		if (attribute == "create") {
			let coordX = +$('#weathermap').attr('data-coordx');
			let coordY = +$('#weathermap').attr('data-coordy');

			CreatePopup(marker, coordY, coordX, markerArray, map);
		}
		else if (attribute == "delete") {

			for (let i = 0; i < markerArray.length; i++) {

				marker = markerArray[i];

				if (marker._pos.x == markerCenterX && marker._pos.y == markerCenterY) {
					marker.remove();
					markerArray.splice(i, 1);
				}
			}
		}
		else if (attribute == "popup") {

			for (let i = 0; i < markerArray.length; i++) {

				marker = markerArray[i];

				if (marker._pos.x == markerCenterX && marker._pos.y == markerCenterY) {

					let longitude = marker._lngLat.lng;
					let latitude = marker._lngLat.lat;

					$('#weathermap').attr('data-latitude', latitude);
					$('#weathermap').attr('data-longitude', longitude);

					marker.remove();
					markerArray.splice(i, 1);

					CreatePopup(marker, latitude, longitude, markerArray, map);
				}
			}
		}

		$(".custom-menu").remove();
	});

	$("#city").keyup(function (event) {
		if (event.keyCode === 13) {
			$("#submitWeather").click();
		}
		else if (event.keyCode == 27) {
			$("#city").val("");
		}
	});

	// Getting city's name by entering in input
	$('#submitWeather').click(function () {
		var city = $("#city").val();
		$("#city").val('');

		if (city != '') {
			$.ajax({
				url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" +
					"&APPID=c10bb3bd22f90d636baa008b1529ee25",
				dataType: "json",
				success: function (data) {
					let longitude = data.coord.lon;
					let latitude = data.coord.lat;

					$('#weathermap').attr('data-latitude', latitude);
					$('#weathermap').attr('data-longitude', longitude);

					map.flyTo({
						center: [
							longitude,
							latitude]
					});

					let description = "<strong>" + data.name + ", " + data.sys.country + "<br><img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'><p>" + data.main.temp + " &deg;C</p>";

					popup = new mapboxgl.Popup()
						.setHTML(description)

					let markerDraggable = $('#weathermap').attr('data-marker-draggable') == "true";

					marker = new mapboxgl.Marker({
						color: $('#weathermap').attr('data-marker-color'),
						draggable: markerDraggable
					})
						.setLngLat([
							longitude,
							latitude
						])
						.setPopup(popup)
						.addTo(map);

					markerArray.push(marker);					
					$('#weathermap').attr('data-cityname', data.name);
					$("#show").html(show(data));
					$("#show1").html(show1(data));
					$("#show2").html(show2(data));
				}
			});
		}
	});
});

// Creating marker with popup
function CreatePopup(marker, latitude, longitude, markerArray, map) {

	$.ajax({
		url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + "&units=metric" +
			"&APPID=c10bb3bd22f90d636baa008b1529ee25",

		dataType: "json",
		success: function (data) {
			let description;
			let cityName = $('#weathermap').attr('data-cityname');

			if (typeof cityName === typeof undefined) {
				cityName = "A place near " + data.name;
				description = "<strong>" + cityName + ", " + data.sys.country + "<br><img src='http://openweathermap.org/img/w/"
					+ data.weather[0].icon + ".png'><p>" + data.main.temp + " &deg;C</p>";
				cityName = "a place near " + data.name;
			}
			else {
				description = "<strong>" + cityName + ", " + data.sys.country + "<br><img src='http://openweathermap.org/img/w/"
					+ data.weather[0].icon + ".png'><p>" + data.main.temp + " &deg;C</p>";
			}

			let popup = new mapboxgl.Popup()
				.setHTML(description)

			let markerDraggable = $('#weathermap').attr('data-marker-draggable') == "true";

			marker = new mapboxgl.Marker({
				color: $('#weathermap').attr('data-marker-color'),
				draggable: markerDraggable
			})
				.setLngLat([
					longitude,
					latitude
				])
				.setPopup(popup)
				.addTo(map);

			markerArray.push(marker);
			$("#show").html(show(data));
			$("#show1").html(show1(data));
			$("#show2").html(show2(data));
		}
	});
}

function timeConverter(UNIX_timestamp) {

	function Add0(myNumber) {
		return myNumber < 10 ? '0' : '';
	}

	var myDate = new Date(UNIX_timestamp * 1000);
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var year = myDate.getFullYear();
	var month = months[myDate.getMonth()];
	var date = myDate.getDate();
	var hour = Add0(myDate.getHours()) + myDate.getHours();
	var min = Add0(myDate.getMinutes()) + myDate.getMinutes();
	var sec = Add0(myDate.getSeconds()) + myDate.getSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}

function show(data) {
	let placeType = $('#weathermap').attr('data-placetype');
	let cityName = $('#weathermap').attr('data-cityname');
	return "<h4 style='font-size:30px; font-weight: bold;'>Current Weather for " + placeType + " " +
		cityName + ", " + data.sys.country + "</h4><br>" +
		"<h4 ><strong>Weather</strong>: " + data.weather[0].main + "</h4>" +
		"<h4 ><strong>Description</strong>: <img src='http://openweathermap.org/img/w/" +
		data.weather[0].icon + ".png'> " + data.weather[0].description + "</h4>" +
		"<h4 ><strong>Temperature</strong>: " + data.main.temp + " &deg;C</h4>" +
		"<h4 ><strong>Pressure</strong>: " + Math.round(data.main.pressure * 0.75) + " mm Hg</h4>" +
		"<h4 ><strong>Humidity</strong>: " + data.main.humidity + " %</h4>" +
		"<h4 ><strong>Min. Temperature</strong>: " + data.main.temp_min + " &deg;C</h4>" +
		"<h4 ><strong>Max. Temperature</strong>: " + data.main.temp_max + " &deg;C</h4>";
}

function show1(data) {
	let placeType = $('#weathermap').attr('data-placetype');
	let cityName = $('#weathermap').attr('data-cityname');

	return "<h4 style='font-size:30px; font-weight: bold;'>Some additional data for " +
		placeType + " " + cityName + ", " + data.sys.country + "</h4><br>" +
		"<h4 ><strong>Weather</strong>: <img src='http://openweathermap.org/img/w/" +
		data.weather[0].icon + ".png'> " + data.weather[0].description +
		"</h4>" + "<h4 ><strong>City longitude</strong>: " + data.coord.lon + " &deg;</h4>" +
		"<h4 ><strong>City Latitude</strong>: " + data.coord.lat + " &deg;</h4>" +
		"<h4 ><strong>Current Time</strong>: " + Date() + " </h4>" +
		"<h4 ><strong>Cloudiness</strong>: " + data.clouds.all + " %</h4>" +
		"<h4 ><strong>Sunrise time</strong>: " + timeConverter(+data.sys.sunrise) + "</h4>" +
		"<h4 ><strong>Sunset time</strong>: " + timeConverter(+data.sys.sunset) + "</h4>";
}


function show2(data) {
	let placeType = $('#weathermap').attr('data-placetype');
	let cityName = $('#weathermap').attr('data-cityname');
	let additionalInformation = "";

	if (typeof cityName === typeof undefined) {
		cityName = " place near " + data.name;
	}

	if (data.name != cityName) {
		additionalInformation = "(This weather data is got for " + data.name + ", " + data.sys.country + ")";
	}

	return "<h4 style='font-size:30px; font-weight: bold;' >Some wind data for " + placeType + " " +
		cityName + ", " + data.sys.country + "</h4><br>" +
		"<h4><strong>Weather</strong>: <img src='http://openweathermap.org/img/w/" +
		data.weather[0].icon + ".png'> " + data.weather[0].description + "<h4><strong>Wind Speed</strong>: " + data.wind.speed + " m/s</h4>" +
		"<h4 ><strong>Wind Direction</strong>: " + data.wind.deg + " &deg;</h4>" +
		"<h4 ><strong>" + additionalInformation + "</strong>";
}
