var login = angular.module('app.main', [])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('main', {
    			url: '/main',
    			templateUrl: 'components/main/main.html',
    			controller: 'MainCtrl'
    		});
    }])
    .controller('MainCtrl', ['$scope', 'UserService', 'ProductService', '$state', function($scope, UserService, ProductService, $state) {
        console.log('its main controller');
        $scope.user = UserService.getUser();
        $scope.user === null ? $state.go('login') : console.log('logged');
        $scope.products = [];

        console.log('logged user', $scope.user);

        $scope.addProduct = function() {
            ProductService.add($scope.newBook);
        };

        $scope.getProduct = function(count) {
            function catchProduct(res) {
                $scope.$apply(function() {
                    $scope.products = res.data;
                });
                console.log('heh', $scope.products);
            }
            ProductService.get($scope.user.objectId, count, catchProduct);
        };
        $scope.getProduct(10);

        $scope.logout = function() {
            UserService.logOut();
        };
    }]);
