var register = angular.module('app.register', [])

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
