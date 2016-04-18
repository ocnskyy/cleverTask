"use strict"
var APPLICATION_ID = '126803CF-FA11-0A0F-FF7F-41CBD2BAE200';
var SECRET_KEY = 'A26FE2D3-F016-D321-FF6D-60F332640700';
var VERSION = 'v1';

Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

var app = angular.module('app', [
    'ui.router',
    'app.login',
    'app.register',
    'app.main',
    'app.settings',
    'app.data.userservice',
    'app.directives'
])
    .controller('StartCtrl', ['$scope', '$state', function($scope, $state) {
        console.log('its start controller');
        localStorage.getItem('current_user') ? $state.go('main') : $state.go('login');
    }]);
