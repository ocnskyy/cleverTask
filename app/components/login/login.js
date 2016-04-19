var login = angular.module('app.login', [])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/404");

        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'components/404/404.html'
            })
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
