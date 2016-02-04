(function() {
    'use strict';
    
    angular
        .module('beer')
        .controller('BeerController', BeerController);
        
    BeerController.$inject = ['BreweryService','BeerService','AclService','Storage','COMPONENTS'];
        
    function BeerController(BreweryService,BeerService,AclService,Storage,COMPONENTS) {
        var vm = this;
        vm.empty = {};
        vm.acl = AclService;
        vm.components = COMPONENTS;

        vm.populate = function(beer) {
            vm.beer = angular.copy(beer);
        }
        vm.reset = function() {
            vm.beer = angular.copy(vm.empty);
        }
        vm.findAllBreweries = function() {
            BreweryService.findAll().then(function(response) {
                vm.breweries = response.data;
            }, function(error) {
                vm.error = error.data;
            });
        }
        vm.findAllBreweries();
        vm.findAll = function() {
            BeerService.findAll().then(function(response) {
                vm.beers = response.data;
            }, function(error) {
                vm.error = error.data;
            });
        }
        vm.save = function(beer) {
            if (beer._id) {
                BeerService.update(beer).then(function(response) {
                    vm.success = response.data;
                    vm.findAll();
                    vm.reset();
                }, function(error) {
                    console.error(error);
                    vm.error = error.data;
                });
            } else {
                beer.user = Storage.getObject('user');
                BeerService.create(beer).then(function(response) {
                    vm.success = response.data;
                    vm.findAll();
                    vm.reset();
                }, function(error) {
                    console.error(error);
                    vm.error = error.data;
                });
            }
        }
        vm.remove = function(beer) {
            if (confirm('You really want to remove the beer ' + beer.name + '?')) {
                BeerService.remove(beer._id).then(function(response) {
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