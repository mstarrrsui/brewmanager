(function() {
    'use strict';

    angular
        .module('app.ingredients')
        .controller('HopsController', HopsController);

    HopsController.$inject = ['$http', 'dataservice', 'logger'];
    /* @ngInject */
    function HopsController($http, dataservice, logger) {
        var vm = this;
        vm.sortorder = 'countryOfOrigin';
        vm.hopFilter = '';
        vm.hops = [];
        vm.currPageData = [];
        vm.title = 'Hops';
        vm.currPage;
        vm.pageSize = 20;
        vm.totalPages;
        vm.clickMe = clickMe;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;

        activate();

        function activate() {
            return getHops().then(function() {
                setCurrPageData(1);
                logger.info('Activated Hops View');
            });
        }

        function setCurrPageData(page) {
            vm.currPage = page;
            vm.currPageData = _.slice(vm.hops,
                ((page - 1) * vm.pageSize),
                (page * vm.pageSize));
        }

        function prevPage() {
            setCurrPageData(vm.currPage - 1);
        }

        function nextPage() {
            setCurrPageData(vm.currPage + 1);
        }



        function getHops() {
            return dataservice.getHops().then(function(data) {
                vm.hops = data;
                vm.totalPages = vm.hops.length / vm.pageSize;
                return vm.hops;
            });
        }

        function clickMe(hopsName) {
            logger.info('Clicked on ' + hopsName + '!!!');
        }
    }
})();

