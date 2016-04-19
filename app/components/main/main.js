var login = angular.module('app.main', [])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('main', {
    			url: '/main',
    			templateUrl: 'components/main/main.html',
    			controller: 'MainCtrl'
    		});
    }])
    .controller('MainCtrl', ['$scope', 'UserService', 'ProductService', '$state', '$timeout', function($scope, UserService, ProductService, $state, $timeout) {
        console.log('its main controller');
        $scope.user = UserService.getUser();
        $scope.user === null ? $state.go('login') : console.log('logged');
        $scope.products = [];
        $scope.deleteProducts = [];
        $scope.editProduct = null;
        $scope.pagination = 10;
        $scope.hideAdd = false;

        console.log('logged user', $scope.user);

        $scope.addProduct = function() {
            function gotSaved(res) {
                $scope.$apply(function() {
                    $scope.products.unshift(res);
                    $scope.newBook = undefined;
                });
            }
            ProductService.add($scope.newBook, gotSaved);
        };

        $scope.getProduct = function(count) {
            function catchProduct(res) {
                $scope.$apply(function() {
                    $scope.products = res.data;
                });
                console.log('heh', $scope.products);
            }
            $scope.pagination = count;
            ProductService.get($scope.user.objectId, count, catchProduct);
        };

        $scope.removeProduct = function() {
            function userDeleted(res) {
                console.log('deleted', res);
                $scope.$apply(function() {
                    $scope.products.splice($scope.deleteProducts[i], 1);
                    $scope.deleteProducts.splice($scope.deleteProducts[i], 1);
                });
            }
            for (var i =0; i < $scope.deleteProducts.length; i++) {
                ProductService.remove($scope.deleteProducts[i], userDeleted, $scope);
            }
        };

        $scope.logout = function() {
            UserService.logOut();
        };
    }]);
