(function() {
    'use strict';
    
    angular
        .module('brewery')
        .controller('BreweryController', BreweryController);
        
    BreweryController.$inject = ['BreweryService','AclService','Storage','COMPONENTS'];
        
    function BreweryController(BreweryService,AclService,Storage,COMPONENTS) {
        var vm = this;
        vm.empty = {};
        vm.acl = AclService;
        vm.components = COMPONENTS;

        vm.populate = function(brewery) {
            vm.brewery = angular.copy(brewery);
        }
        vm.reset = function() {
            vm.brewery = angular.copy(vm.empty);
        }
        vm.findAll = function() {
            BreweryService.findAll().then(function(response) {
                vm.breweries = response.data;
            }, function(error) {
                vm.error = error.data;
            });
        }
        vm.save = function(brewery) {
            if (brewery._id) {
                BreweryService.update(brewery).then(function(response) {
                    vm.success = response.data;
                    vm.findAll();
                    vm.reset();
                }, function(error) {
                    console.error(error);
                    vm.error = error.data;
                });
            } else {
                brewery.user = Storage.getObject('user');
                BreweryService.create(brewery).then(function(response) {
                    vm.success = response.data;
                    vm.findAll();
                    vm.reset();
                }, function(error) {
                    console.error(error);
                    vm.error = error.data;
                });
            }
        }
        vm.remove = function(brewery) {
            if (confirm('You really want to remove the brewery ' + brewery.name + '?')) {
                BreweryService.remove(brewery._id).then(function(response) {
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