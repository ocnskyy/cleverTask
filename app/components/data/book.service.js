var bookService = angular.module('app.data.bookservice',[])
    .factory('BookService', function($state) {
        var gotError = function ( err ) {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        };

        var add = function(obj) {
            function gotSaved() {
                console.log('SUCCESS');
            }
            Backendless.Persistence.of('Book').save(obj, new Backendless.Async(gotSaved, gotError));
        };

        var remove = function() {

        };

        var edit = function() {

        };

        return {
            add : add,
            remove : remove,
            edit : edit
        };
    });
