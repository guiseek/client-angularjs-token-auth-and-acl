(function() {
    'use strict';
    
    angular
        .module('auth', ['ngRoute'])
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        })
        .run(function($rootScope,$location,Storage) {
            $rootScope.$on('$routeChangeStart',function(e, next, current) {
                if (!Storage.get('token')) {
                    $location.url('/signin');
                }
                if (Storage.getObject('user')) {
                    $rootScope.logged = Storage.getObject('user');
                }
            });
        });
        
})();