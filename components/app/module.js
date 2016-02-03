(function() {
    'use strict';
    
    angular
        .module('app', ['ngRoute','auth','user'])
        .config(Config);
        
    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'components/app/app.html',
                controller: 'AppController',
                controllerAs: 'vm'
            });
    }
})();
