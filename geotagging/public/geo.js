$(document).on("pageinit", function() {
    
    $("#name").keyup(function(){
    checkEnableSubmit();
    });
});

function addGeoTag() {	
	$.getJSON("http://jsonip.com/?callback=?", function(data) {		
		var geotag = {
				latitude : $('#latitude').val(),
				longitude : $('#longitude').val(),
				accuracy : $('#accuracy').val(),
				timestamp : $('#timestamp').val(),
				valid : true,
				name : $('#name')[0].value,
				createdBy : data.ip
			};
		
		clearInputs();	
		
		$.ajax("/tags", {
			data : JSON.stringify(geotag),
			contentType : 'application/json',
			type : 'POST'
		});
	});
}

function getLocation() {
	if (navigator.geolocation) {
		var options = {
			enableHighAccuracy : true,
			timeout : 5000,
			maximumAge : 0
		};
		navigator.geolocation.getCurrentPosition(showPosition, error, options);
	} else {
		console.warn("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
	$('#longitude').val(position.coords.longitude);
	$('#latitude').val(position.coords.latitude);
	$('#accuracy').val(position.coords.accuracy);
	$('#timestamp').val(position.timestamp);

	checkEnableSubmit();
}

function checkEnableSubmit() {
	var name = $('#name').val();
	var lon = $('#longitude').val();
	var lat = $('#latitude').val();
	var acc = $('#accuracy').val();
	var tm = $('#timestamp').val();

	if (name && lon && lat && acc && tm) {
		$('#submit').button('enable');
	}
}

function clearInputs() {
	$('#longitude').val("");
	$('#latitude').val("");
	$('#accuracy').val("");
	$('#timestamp').val("");
	$('#name').val("");
	$('#submit').button('disable');
}

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
}