var productList = angular.module('app.ui.productlist', [])
    .directive('productList', function() {
        var controller = function($scope, ProductService) {
            $scope.current = null;
            $scope.openClose = function(param, curr) {
                $scope.current = (param == curr ? null : param);
            };

            $scope.addToRemove = function(p) {
                if (p.toDelete == true) {
                    p.toDelete = false;
                    $scope.deleteProducts.splice($scope.deleteProducts.indexOf(p), 1);
                }
                else {
                    p.toDelete = true;
                    $scope.deleteProducts.push(p);
                }
            };

            $scope.editProductFunc = function(p) {
                    $scope.editProduct = p;
            };

            $scope.getProduct(10);
        };

        return {
            controller : controller,
            templateUrl : 'components/product-list-directive/product-list.directive.html',
        };
    });
