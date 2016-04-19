var navbarMenu = angular.module('app.ui.navbarmenu', [])
    .directive('navbarMenu', function() {
        return {
            templateUrl : 'components/navbar-menu-directive/navbar-menu.directive.html'
        };
    });
