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
    .controller('RegisterCtrl', ['$scope', function($scope) {
        console.log('its registration controller');
    }]);
