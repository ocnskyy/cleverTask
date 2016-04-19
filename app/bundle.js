"use strict"
var APPLICATION_ID = '126803CF-FA11-0A0F-FF7F-41CBD2BAE200';
var SECRET_KEY = 'A26FE2D3-F016-D321-FF6D-60F332640700';
var VERSION = 'v1';

Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);

var app = angular.module('app', [
    'ui.router',
    'app.login',
    'app.register',
    'app.main',
    'app.settings',
    'app.data.userservice',
    'app.data.productservice',
    'app.val.pwcheck',
    'app.ui.navbarmenu',
    'app.ui.addproduct',
    'app.ui.editproduct',
    'app.ui.productlist',
    'app.ui.changepw',
    'monospaced.elastic'
])
    .controller('StartCtrl', ['$scope', '$state', function($scope, $state) {
        console.log('its start controller');
        localStorage.getItem('current_user') ? $state.go('main') : $state.go('login');
    }]);

var addProduct = angular.module('app.ui.addproduct', [])
    .directive('addProduct', function() {

        return {
            templateUrl : 'components/add-product-directive/add-product.directive.html',
        };
    });

var productService = angular.module('app.data.productservice',[])
    .factory('ProductService', function($state) {
        var gotError = function ( err ) {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        };

        var add = function(obj, callback) {
            Backendless.Persistence.of('Product').save(obj, new Backendless.Async(callback, gotError));
        };

        var get = function(owner, count, callback) {
            var dataQuery = new Backendless.DataQuery();
            dataQuery.condition = "ownerId = '" + owner + "'";
            dataQuery.options = {pageSize : count};
            Backendless.Persistence.of('Product').find(dataQuery, new Backendless.Async(callback, gotError));
        };

        var remove = function(p, callback) {
            Backendless.Persistence.of('Product').remove(p, new Backendless.Async(callback, gotError));
        };

        return {
            add : add,
            get : get,
            remove : remove
        };
    });

var userService = angular.module('app.data.userservice',[])
    .factory('UserService', ['$state', function($state) {
        var gotError = function ( err ) {
            alert(err.message);
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        };

        var edit = function(p, callback) {
            Backendless.UserService.update(p, new Backendless.Async(callback, gotError));
        };

        var getUser = function() {
            return Backendless.UserService.getCurrentUser();
        };

        var logIn = function(obj) {
            function userLoggedIn( user ) {
        		$state.go('main');
                remember === true ? localStorage.setItem('current_user', username) : console.log('dont remember');
        	}
            var username = obj.login,
                password = obj.password,
                remember = obj.remember;

            Backendless.UserService.login(username, password, remember, new Backendless.Async(userLoggedIn, gotError));
        };

        var logOut = function() {
            localStorage.removeItem('current_user');
            function userLoggedout(obj) {
    		   $state.go('login');
    	   }

    	   Backendless.UserService.logout(new Backendless.Async(userLoggedout, gotError));
        };

        var register = function(obj) {
            function userRegistered() {
                $state.go('login');
            }
            var user = new Backendless.User();
            user.name = obj.name;
            user.surname = obj.surname;
            user.email = obj.email;
            user.password = obj.password;
            user.telephone = obj.telephone;
            Backendless.UserService.register(user, new Backendless.Async(userRegistered, gotError));
        };

        return {
            edit : edit,
            getUser : getUser,
            logIn : logIn,
            logOut : logOut,
            register : register
        };
    }]);

var changePw = angular.module('app.ui.changepw', [])
    .directive('changePw', function() {
        return {
            templateUrl : 'components/change-pw-directive/change-pw.directive.html'
        };
    });

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

var login = angular.module('app.login', [])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/404");

        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'components/404/404.html'
            })
    		.state('login', {
    			url: '/login',
    			templateUrl: 'components/login/login.html',
    			controller: 'LoginCtrl'
    		});
    }])
    .controller('LoginCtrl', ['$scope', 'UserService', function($scope, UserService) {
        console.log('its login controller');
        $scope.loginMe = function() {
            console.log('login info', $scope.user);
            UserService.logIn($scope.user);
        };

    }]);

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

var navbarMenu = angular.module('app.ui.navbarmenu', [])
    .directive('navbarMenu', function() {
        return {
            templateUrl : 'components/navbar-menu-directive/navbar-menu.directive.html'
        };
    });

var productList = angular.module('app.ui.productlist', [])
    .directive('productList', function() {
        var controller = function($scope, ProductService) {
            $scope.current = null;
            $scope.openClose = function(param, curr) {
                $scope.current = (param == curr ? null : param);
            };

            $scope.editProduct = function(p) {
                $scope.editProduct = p;
            };

            $scope.addToRemove = function(p) {
                console.log('srabotalo');
                if (p.toDelete == true) {
                    p.toDelete = false;
                    $scope.deleteProducts.splice($scope.deleteProducts.indexOf(p), 1);
                }
                else {
                    p.toDelete = true;
                    $scope.deleteProducts.push(p);
                }
                console.log('yo', $scope.deleteProducts);
            };

            $scope.getProduct(10);
        };

        return {
            controller : controller,
            templateUrl : 'components/product-list-directive/product-list.directive.html',
        };
    });

angular.module('app.val.pwcheck', [])
  .directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
  };
  }]);

var register = angular.module('app.register', [])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
    		.state('register', {
    			url: '/register',
    			templateUrl: 'components/register/register.html',
    			controller: 'RegisterCtrl'
    		});
    }])
    .controller('RegisterCtrl', ['$scope', 'UserService', function($scope, UserService) {
        console.log('its registration controller');
        $scope.registerMe = function() {
            console.log('register', $scope.user);
            UserService.register($scope.user);
        };
    }]);

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
