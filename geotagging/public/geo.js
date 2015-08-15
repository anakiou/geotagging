var clientIp = "NONE";

$(document).on("pageinit", function() {
    
    $("#name").keyup(function(){
    checkEnableSubmit();
});

	$.getJSON("http://jsonip.com/?callback=?", function(data) {
		console.log(data);
		clientIp = data.ip;
	});
});

function addGeoTag() {
	console.log("Adding geotag");

	var taggedDevice = {
		latitude : $('#latitude')[0].value,
		longitude : $('#longitude')[0].value,
		accuracy : $('#accuracy')[0].value,
		timestamp : $('#timestamp')[0].value,
		valid : true,
		name : $('#name')[0].value,
		createdBy : clientIp
	};

	clearInputs();

	$.ajax("/tags", {
		data : JSON.stringify(taggedDevice),
		contentType : 'application/json',
		type : 'POST'
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
	var name = $('#name')[0].value;
	var lon = $('#longitude')[0].value;
	var lat = $('#latitude')[0].value;
	var acc = $('#accuracy')[0].value;
	var tm = $('#timestamp')[0].value;
	var btnSubmit = $('#submit')[0];

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