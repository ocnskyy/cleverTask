var editProduct = angular.module('app.ui.editproduct', [])
    .directive('editProduct', function() {
        var controller = function($scope, ProductService) {
            $scope.finishUpdate = function() {
                function productEdited() {
                    console.log('edited');
                };
                ProductService.add($scope.editProduct, productEdited);
            };
        };

        return {
            controller : controller,
            templateUrl : 'components/edit-product-directive/edit-product.directive.html'
        };
    });
