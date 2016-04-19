var productService = angular.module('app.data.productservice',[])
    .factory('ProductService', function($state) {
        var gotError = function ( err ) {
            console.log( "error message - " + err.message );
            console.log( "error code - " + err.statusCode );
        };

        var add = function(obj) {
            function gotSaved() {
                console.log('SUCCESS');
            }
            Backendless.Persistence.of('Product').save(obj, new Backendless.Async(gotSaved, gotError));
        };

        var get = function(owner, count, callback) {
            var dataQuery = new Backendless.DataQuery();
            dataQuery.condition = "ownerId = '" + owner + "'";
            dataQuery.options = {pageSize : count};
            Backendless.Persistence.of('Product').find(dataQuery, new Backendless.Async(callback, gotError));
        };

        var remove = function() {

        };

        var edit = function() {

        };

        return {
            add : add,
            get : get,
            edit : edit,
            remove : remove
        };
    });
