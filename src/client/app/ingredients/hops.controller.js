(function() {
    'use strict';

    angular
        .module('app.ingredients')
        .controller('HopsController', HopsController);

    HopsController.$inject = ['$http', 'dataservice', 'logger'];
    /* @ngInject */
    function HopsController($http, dataservice, logger) {
        var vm = this;
        vm.hops = [];
        //vm.gotoCustomer = gotoCustomer;
        vm.title = 'Hops';

        activate();

        function activate() {
            return getHops().then(function() {
                logger.info('Activated Hops View');
            });
        }

        function getHops() {
            return dataservice.getHops().then(function(data) {
                vm.hops = data;
                return vm.hops;
            });
        }

        
    }
})();

