(function() {
    'use strict';
    
    angular
        .module('auth')
        .config(Config);
        
    function Config($routeProvider) {
        $routeProvider
            .when('/signin', {
                templateUrl: 'components/auth/signin.html',
                controller: 'AuthController',
                controllerAs: 'vm'
            });
    }
        
})();