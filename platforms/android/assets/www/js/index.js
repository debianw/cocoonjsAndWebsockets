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
var websockets = window.sockets = {};

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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        app.testWebSockets(1);
        app.testWebSockets(2);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Test websockets
    testWebSockets: function (id) {
        app.writeResult('Creating WebSocket: #'+id);

        var w = websockets[id] = new WebSocket("wss://echo.websocket.org/");

        w.id = id;
        w.onopen = this.onSocketOpen;
        w.onclose = this.onSocketClose;
        w.onmessage = this.onSocketMessage;
        w.onerror = this.onSocketError;
    },

    // @handler: open
    onSocketOpen: function (e) {
        app.writeResult('socket connected: #'+ this.id);
        app.writeResult('Echo: '+'Hello ws #'+ this.id);

        this.send('Hello ws #'+ this.id);
    },

    // @handler: close
    onSocketClose: function (e) {
        app.writeResult('socket disconnected: #'+ this.id);
    },

    // @handler: message
    onSocketMessage: function (e) {
        app.writeResult('Echo received: '+e.data);
    },

    // @handler: error
    onSocketError: function (e) {
        console.log('Error: ', e);
        app.writeResult('Error connecting socket #' + this.id);
    },

    // write on screen
    writeResult: function (msg) {
        var el = document.querySelector('#websockets')
          , child = document.createElement('div');

        child.innerHTML = msg;
        el.appendChild(child);

        console.log(msg);
    }
};
