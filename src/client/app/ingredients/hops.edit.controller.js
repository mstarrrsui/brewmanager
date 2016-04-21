(function() {
    'use strict';

    angular
        .module('app.ingredients')
        .controller('HopsEditController', HopsEditController);

    HopsEditController.$inject = ['$http', '$routeParams', 'dataservice', 'logger'];
    /* @ngInject */
    function HopsEditController($http, $routeParams, dataservice, logger) {
        var vm = this;
        vm.hopId = $routeParams.id;
        vm.hop = {};

        activate();

        function activate() {
            return dataservice.getHop(vm.hopId).then(function(data) {
                vm.hop = data;
                logger.info('Activated Hops Edit View');
            });
        }


    }
})();

