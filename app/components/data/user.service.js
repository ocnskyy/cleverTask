var userService = angular.module('app.data.userservice',[])
    .factory('UserService', ['$state', function($state) {
        var gotError = function ( err ) {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        };

        var getUser = function() {
            return Backendless.UserService.getCurrentUser();
        };

        var logIn = function(obj) {
            function userLoggedIn( user ) {
        		$state.go('main');
        		console.log(user);
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
            console.log('here', user);
            Backendless.UserService.register(user, new Backendless.Async(userRegistered, gotError));
        };

        return {
            getUser : getUser,
            logIn : logIn,
            logOut : logOut,
            register : register
        };
    }]);
