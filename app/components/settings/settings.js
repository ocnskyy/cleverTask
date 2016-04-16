var settings = angular.module('app.settings', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('settings', {
    			url: '/settings',
    			templateUrl: 'components/settings/settings.html',
    			controller: 'SettingsCtrl'
    		});
    }])
    .controller('SettingsCtrl', ['$scope', 'UserService', function($scope, UserService) {
        console.log('its settings controller');

    }]);
