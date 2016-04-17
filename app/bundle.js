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
    'app.data.userservice'
])
    .controller('StartCtrl', ['$scope', '$state', function($scope, $state) {
        console.log('its start controller');
        localStorage.getItem('current_user') ? $state.go('main') : $state.go('login');
    }]);

var userService = angular.module('app.data.userservice',[])
    .factory('UserService', ['$state', function($state) {
        var gotError = function ( err ) {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        };

        var getUser = function() {
            return Backendless.UserService.getCurrentUser();
        };

        var logIn = function(obj) {
            function userLoggedIn( user ) {
        		$state.go('main');
        		console.log(user);
                remember === true ? localStorage.setItem('current_user', username) : console.log('dont remember');
        	}
            var username = obj.login,
                password = obj.password,
                remember = obj.remember;

            Backendless.UserService.login(username, password, remember, new Backendless.Async(userLoggedIn, gotError));
        };

        var logOut = function() {
            localStorage.removeItem('current_user');
            function userLoggedout(obj) {
    		   $state.go('login');
    	   }

    	   Backendless.UserService.logout(new Backendless.Async(userLoggedout, gotError));
        };

        var register = function(obj) {
            function userRegistered() {
                $state.go('login');
            }
            var user = new Backendless.User();
            user.name = obj.name;
            user.surname = obj.surname;
            user.email = obj.email;
            user.password = obj.password;
            user.telephone = obj.telephone;
            console.log('here', user);
            Backendless.UserService.register(user, new Backendless.Async(userRegistered, gotError));
        };

        return {
            getUser : getUser,
            logIn : logIn,
            logOut : logOut,
            register : register
        };
    }]);

var login = angular.module('app.login', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('login', {
    			url: '/login',
    			templateUrl: 'components/login/login.html',
    			controller: 'LoginCtrl'
    		});
    }])
    .controller('LoginCtrl', ['$scope', 'UserService', function($scope, UserService) {
        console.log('its login controller');
        $scope.loginMe = function() {
            console.log('login info', $scope.user);
            UserService.logIn($scope.user);
        };

    }]);

var login = angular.module('app.main', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('main', {
    			url: '/main',
    			templateUrl: 'components/main/main.html',
    			controller: 'MainCtrl'
    		});
    }])
    .controller('MainCtrl', ['$scope', 'UserService', '$state', function($scope, UserService, $state) {
        console.log('its main controller');
        $scope.user = UserService.getUser();
        $scope.user === null ? $state.go('login') : console.log('logged');;

        console.log('here', $scope.user);

        $scope.logout = function() {
            UserService.logOut();
        };
    }]);

// var registration = angular.module('app.registration', ['ui.router'])
//
//     .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
//         $stateProvider
//             .state('registration', {
//                 url: '/registration',
//                 templateUrl: 'components/registration/registration.html',
//                 controller: 'RegistrationCtrl'
//             });
//     }])
//     .controller('RegistrationCtrl', ['$scope', function($scope) {
//         console.log('its registration controller');
//     }]);


var register = angular.module('app.register', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('register', {
    			url: '/register',
    			templateUrl: 'components/register/register.html',
    			controller: 'RegisterCtrl'
    		});
    }])
    .controller('RegisterCtrl', ['$scope', 'UserService', function($scope, UserService) {
        console.log('its registration controller');
        $scope.registerMe = function() {
            console.log('register', $scope.user);
            UserService.register($scope.user);
        };
    }]);

var settings = angular.module('app.settings', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('settings', {
    			url: '/settings',
    			templateUrl: 'components/settings/settings.html',
    			controller: 'SettingsCtrl'
    		});
    }])
    .controller('SettingsCtrl', ['$scope', 'UserService', function($scope, UserService) {
        console.log('its settings controller');

    }]);
