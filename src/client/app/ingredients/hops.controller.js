(function() {
    'use strict';

    angular
        .module('app.ingredients')
        .controller('HopsController', HopsController);

    HopsController.$inject = ['$http'];
    /* @ngInject */
    function HopsController($http) {
        var vm = this;
        vm.hops = [];
        //vm.gotoCustomer = gotoCustomer;
        vm.title = 'Hops';

        activate();

        function activate() {
            return getHops().then(function() {
                //logger.info('Activated Hops View');
            });
        }

        function getHops() {
            return getHopsData().then(function(data) {
                vm.hops = data;
                return vm.hops;
            });
        }

        function getHopsData() {
            return $http.get('/api/hops')
                .then(getHopsComplete)
                .catch(function(message) {
                    //exception.catcher('XHR Failed for getCustomers')(message);
                    //$location.url('/');
                });

            function getHopsComplete(data, status, headers, config) {
                return data.data;
            }
        }
    }
})();

