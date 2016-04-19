var addProduct = angular.module('app.ui.addproduct', [])
    .directive('addProduct', function() {

        return {
            templateUrl : 'components/add-product-directive/add-product.directive.html'
        };
    });
