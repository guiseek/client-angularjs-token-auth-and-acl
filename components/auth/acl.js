(function() {
    'use strict';
    
    angular
        .module('auth')
        .service('AclService', AclService);
        
    AclService.$inject = ['$rootScope'];
        
    function AclService($rootScope) {
        this.isUser = function() {
            if ($rootScope.logged && $rootScope.logged.roles.indexOf('user') > -1) {
                return true;
            } else {
                return false;
            }
        }
        this.isAdmin = function() {
            if ($rootScope.logged && $rootScope.logged.roles.indexOf('admin') > -1) {
                return true;
            } else {
                return false;
            }
        }
        this.isMe = function(id) {
            if ($rootScope.logged && $rootScope.logged._id == id) {
                return true;
            } else {
                return false;
            }
        }
    }
        
})();