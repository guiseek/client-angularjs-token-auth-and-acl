(function() {
    'use strict';
    
    angular
        .module('auth', ['ngRoute'])
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        })
        .run(function($rootScope,$location,Storage) {
            $rootScope.$on('updateLogged',function(e, user) {
                Storage.setObject('user', user);
                $rootScope.logged = user;
            });
            $rootScope.$on('$routeChangeStart',function(e, next, current) {
                if (Storage.getObject('user')) {
                    $rootScope.logged = Storage.getObject('user');
                }
                if (!Storage.get('token')) {
                    $location.url('/signin');
                }
            });
        });
        
})();