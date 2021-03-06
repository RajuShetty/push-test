/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById("toggleBtn").addEventListener('click', this.toggle, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
		var push = PushNotification.init({
	android: {
	},
	ios: {
		alert: "true",
		badge: "true",
		sound: "true"
	},
	windows: {}
});

push.on('registration', function(data) {
	console.log(data.registrationId);
	var deviceToken = data.registrationId;
	$.ajax({
        "url": "http://vineyardworkerschurch.org/?smpushcontrol=savetoken",
        "dataType": "json",
        "method": "POST",
        "data": {
            "device_token" : deviceToken,
            "device_type" : 'android'
        },
        "success": function(response) {
            console.log("Device ID "+deviceToken+" sent successfuly");
        }
    });
});

push.on('notification', function(data) {
	data.message,
	data.title,
	data.count,
	data.sound,
	data.image,
	data.additionalData
	console.log(data);
	alert(data.message);
});

push.on('error', function(e) {
	console.log(e.message);
});
		
push.on('error', function(e) {
	console.log("Error");
});
	
	push.on('notification', function(data) {
     console.log('notification event');
     var cards = document.getElementById("cards");
     var push = '<div class="row">' +
       '<div class="col s12 m6">' +
       '  <div class="card darken-1">' +
       '    <div class="card-content black-text">' +
       '      <span class="card-title black-text">' + data.title + '</span>' +
       '      <p>' + data.message + '</p>' +
       '      <p>' + data.additionalData.foreground + '</p>' +
       '    </div>' +
       '  </div>' +
       ' </div>' +
       '</div>';
     cards.innerHTML += push;

     app.push.finish(function() {
         console.log('success');
     }, function() {
         console.log('error');
     });
 });	
		
 
 
        console.log('deviceready event');
        document.getElementById('regId').innerHTML = 'true';
    }
};

 app.initialize();
