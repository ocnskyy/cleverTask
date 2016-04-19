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
