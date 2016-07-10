#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var sleep = require('sleep');
// connect to RabbitMQ server

amqp.connect('amqp://localhost', function(err, conn) {});

// Next we create a channel, which is where most of the API for getting things done resides:

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {});
});

// To send, we must declare a queue for us to send to; then we can publish a message to the queue:

amqp.connect('amqp://localhost', function(err, conn) {
  	conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
   for(var i=10;i>1;i--)
    {
    	var message = 'Hello World!' + i;
    ch.sendToQueue(q, new Buffer(message));
    sleep.sleep(1);
    console.log(" [x] Sent '" + message);
}
  });
});


//Declaring a queue is idempotent - it will only be created if it doesn't exist already. The message content is a byte array, so you can encode whatever you like there.

//Lastly, we close the connection and exit;

setTimeout(function() { conn.close(); process.exit(0) }, 10000);
