(function() {
    'use strict';
    
    angular
        .module('user')
        .controller('UserController', UserController);
        
    UserController.$inject = ['UserService','AclService','Storage','COMPONENTS','$rootScope'];
        
    function UserController(UserService,AclService,Storage,COMPONENTS,$rootScope) {
        var vm = this;
        vm.empty = {};
        vm.acl = AclService;
        vm.components = COMPONENTS;
        vm.roles = [
            {
                name: 'Admin',
                value: 'admin'
            },{
                name: 'User',
                value: 'user'
            }
        ];
        vm.findAll = function() {
            UserService.findAll().then(function(response) {
                vm.users = response.data;
            }, function(error) {
                vm.error = error.data;
            });
        }
        vm.toggleRoles = function(role) {
            var index = vm.user.roles.indexOf(role);
            if (index > -1) {
                vm.user.roles.splice(index, 1);
            } else {
                vm.user.roles.push(role);
            }
        }
        vm.populate = function(user) {
            vm.user = angular.copy(user);
        }
        vm.reset = function() {
            vm.user = angular.copy(vm.empty);
        }
        vm.save = function(user) {
            if (user._id) {
                UserService.update(user).then(function(response) {
                    if (AclService.isMe(user._id)) {
                        $rootScope.$emit('updateLogged', response.data.user);
                    }
                    vm.success = response.data;
                    vm.findAll();
                    vm.reset();
                }, function(error) {
                    console.error(error);
                    vm.error = error.data;
                });
            } else {
                UserService.create(user).then(function(response) {
                    vm.success = response.data;
                    vm.findAll();
                    vm.reset();
                }, function(error) {
                    console.error(error);
                    vm.error = error.data;
                });
            }
        }
        vm.remove = function(user) {
            if (confirm('You really want to remove the user ' + user.name + '?')) {
                UserService.remove(user._id).then(function(response) {
                    vm.success = response.data;
                    vm.findAll();
                }, function(error) {
                    console.error(error);
                    vm.error = error.data;
                })
            }
        }
    }
        
})();