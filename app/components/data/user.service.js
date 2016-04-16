var userService = angular.module('app.data.userservice',[])
    .factory('UserService', ['$state', function($state) {
        var gotError = function ( err ) {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        };

        var logIn = function(obj) {
            function userLoggedIn( user ) {
        		$state.go('main');
        		console.log(user);
        		localStorage.setItem('current_user', username);
        	}
            var username = obj.login,
                password = obj.password,
                remember = obj.remember;

            Backendless.UserService.login(username, password, remember, new Backendless.Async(userLoggedIn, gotError));
        };

        var logOut = function() {
            localStorage.removeItem('current_user');
            function userLoggedout(obj) {
    		   console.log(obj);
    		   $state.go('login');
    	   }

    	   Backendless.UserService.logout(new Backendless.Async(userLoggedout, gotError));
        };

        var register = function(name, surname, email, password, telephone) {
            var user = new Backendless.User();
            user.name = name;
            user.surname = surname;
            user.email = email;
            user.password = password;
            user.telephone = telephone;
            Backendless.UserService.register(user, new Backendless.Async(userRegistered, gotError));
        };

        return {
            logIn : logIn,
            logOut : logOut,
            register : register
        };
    }]);
