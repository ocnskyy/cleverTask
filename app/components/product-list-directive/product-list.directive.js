var productList = angular.module('app.ui.productlist', [])
    .directive('productList', function() {
        var controller = function($scope) {
            $scope.list = {current : null};
            $scope.openClose = function(param, curr) {
                $scope.list.current = (param == curr ? null : param);
            };
        };

        return {
            controller : controller,
            templateUrl : 'components/product-list-directive/product-list.directive.html',
        };
    });
