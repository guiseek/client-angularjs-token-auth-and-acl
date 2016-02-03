(function() {
    'use strict';
    
    angular
        .module('user')
        .config(Config);
        
    function Config($routeProvider) {
        $routeProvider
            .when('/users', {
                templateUrl: 'components/user/user.html',
                controller: 'UserController',
                controllerAs: 'vm'
            });
    }
        
})();