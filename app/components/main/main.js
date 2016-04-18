var login = angular.module('app.main', [])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('main', {
    			url: '/main',
    			templateUrl: 'components/main/main.html',
    			controller: 'MainCtrl'
    		});
    }])
    .controller('MainCtrl', ['$scope', 'UserService', 'BookService', '$state', function($scope, UserService, BookService, $state) {
        console.log('its main controller');
        $scope.user = UserService.getUser();
        $scope.user === null ? $state.go('login') : console.log('logged');;

        console.log('here', $scope.user);

        $scope.addBook = function() {
            BookService.add($scope.newBook);
        };

        $scope.logout = function() {
            UserService.logOut();
        };
    }]);
