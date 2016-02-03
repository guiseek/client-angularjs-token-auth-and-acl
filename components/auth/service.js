(function() {
    'use strict';
    
    angular
        .module('auth')
        .service('AuthService', AuthService);
        
    AuthService.$inject = ['$http'];
        
    function AuthService($http) {
        this.signin = function(credentials) {
            return $http.post('http://localhost:3000/api/signin', credentials);
        }
    }
        
})();