(function() {
    'use strict';
    
    angular
        .module('auth')
        .controller('AuthController', AuthController);
        
    AuthController.$inject = ['AuthService','AclService','Storage','COMPONENTS','$location'];
        
    function AuthController(AuthService,AclService,Storage,COMPONENTS,$location) {
        var vm = this;
        vm.credentials = {};
        vm.acl = AclService;
        vm.components = COMPONENTS;
        vm.signin = function() {
            AuthService.signin(vm.credentials).then(function(response) {
                Storage.setObject('user',response.data.user);
                Storage.set('token', response.data.token);
                $location.url('/');
            }, function(error) {
                vm.error = error.data.message;
                vm.credentials = {};
            });
        }
        vm.signout = function() {
            Storage.remove('user');
            Storage.remove('token');
            $location.path('/signin');
        }
    }
        
})();