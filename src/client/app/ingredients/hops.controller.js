(function() {
    'use strict';

    angular
        .module('app.ingredients')
        .controller('HopsController', HopsController);

    HopsController.$inject = ['$scope','$http', 'dataservice', 'logger', 'hopsFilter'];
    /* @ngInject */
    function HopsController($scope, $http, dataservice, logger, hopsFilter) {
        var vm = this;
        vm.sortorder = 'countryOfOrigin';
        vm.searchCriteria = '';
        vm.filterString = '';
        vm.hopFilter = '';
        vm.hops = [];
        vm.currPageData = [];
        vm.title = 'Hops';
        vm.currPage = 1;
        vm.pageSize = 20;
        vm.totalPages = -1;
        vm.clickMe = clickMe;
        vm.nextPage = nextPage;
        vm.prevPage = prevPage;

        activate();

        $scope.$watch(function () {
            return vm.filterString;
        },function(value){
            //console.log(value);
        });




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

