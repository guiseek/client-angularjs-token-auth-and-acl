(function() {
    'use strict';
    
    angular
        .module('brewery')
        .config(Config);
        
    function Config($routeProvider) {
        $routeProvider
            .when('/breweries', {
                templateUrl: 'components/brewery/brewery.html',
                controller: 'BreweryController',
                controllerAs: 'vm'
            });
    }
        
})();