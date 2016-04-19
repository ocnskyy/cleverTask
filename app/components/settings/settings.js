var settings = angular.module('app.settings', [])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('settings', {
    			url: '/settings',
    			templateUrl: 'components/settings/settings.html',
    			controller: 'SettingsCtrl'
    		});
    }])
    .controller('SettingsCtrl', ['$scope', 'UserService', '$state', function($scope, UserService, $state) {
        console.log('its settings controller');
        $scope.user = UserService.getUser();
        $scope.editUser = UserService.getUser();
        // $scope.user === null ? $state.go('login') : console.log('logged');
        $scope.hideAdd = true;
        localStorage.getItem('current_user') || $scope.user ? console.log('logged') : $state.go('login');

        $scope.updateUser = function() {
            console.log('here', $scope.editUser);
            function gotEdited(res) {
                console.log('edited');
            }
            UserService.edit($scope.editUser, gotEdited);
        };

        $scope.logout = function() {
            UserService.logOut();
        };

    }]);
