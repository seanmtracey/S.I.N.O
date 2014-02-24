var express = require('express'),
	app = express(),
	http = require('http'),
	fs = require('fs'),
	querystring = require('querystring'),
	request = require('request'),
	port = 9090,
	server = app.listen(port),
	io = require('socket.io').listen(server/*, { log: false }*/),
	serialport = require("serialport"),
	SerialPort = serialport.SerialPort;
	connections = [];

app.use(express.bodyParser())

app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());


app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
 });

console.log("Server started.\nAvailable on localhost:" + port);

io.sockets.on('connection', function (socket) {

	connections.push(socket);

});

var arduino = new SerialPort("YOUR ARDUINO PORT", {
  baudrate: 28800,
  parser: serialport.parsers.readline("\n")
});

arduino.open(function(){

	arduino.on('data', function(data) {

		data = data.split(',');

		switch(data[0]){
			case "dW":
				data[0] = "digitalWrite";
				break;
			case "dR":
				data[0] = "digitalRead";
				break;
			case "aW":
				data[0] = "analogWrite";
				break;
			case "aR":
				data[0] = "analogWrite";
				break;
		}

		var sendable = {
			"method" : data[0],
			"pin" : data[1],
			"value" : data[2]
		}

		for(var x = 0; x < connections.length; x += 1){

			connections[x].emit('info', {
				info : sendable
			});

		}

	});


})

