var login = angular.module('app.main', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('main', {
    			url: '/main',
    			templateUrl: 'components/main/main.html',
    			controller: 'MainCtrl'
    		});
    }])
    .controller('MainCtrl', ['$scope', 'UserService', function($scope, UserService) {
        console.log('its main controller');
        $scope.user = localStorage.getItem('current_user');

        $scope.logout = function() {
            UserService.logOut();
        };
    }]);
