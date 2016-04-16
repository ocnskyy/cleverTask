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

            UserService.logIn($scope.user);
        };

    }]);
