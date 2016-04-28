(function() {
    'use strict';

    angular
        .module('app.ingredients')
        .controller('HopsController', HopsController);

    HopsController.$inject = ['$scope','$http', 'dataservice', 'logger', 'hopsFilter'];
    /* @ngInject */
    function HopsController($scope, $http, dataservice, logger, hopsFilter) {
        var vm = this;
        vm.filterString = '';
        vm.hopFilter = '';
        vm.hops = [];
        vm.filteredData = [];
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
            console.log('filter:' + value);
            setCurrPageData(1);
        });




        function activate() {
            return getHops().then(function() {
                setCurrPageData(1);
                logger.info('Activated Hops View');
            });
        }



        function setCurrPageData(page) {

            filterData();
            vm.currPage = page;
            vm.currPageData = _.slice(vm.filteredData,
                ((page - 1) * vm.pageSize),
                (page * vm.pageSize));
        }

        function prevPage() {
            setCurrPageData(vm.currPage - 1);
        }

        function nextPage() {
            setCurrPageData(vm.currPage + 1);
        }

        function filterData() {
            vm.filteredData = vm.hops;
            if (vm.filterString !== '') {
                vm.filteredData = _.filter(vm.filteredData, function(o) {
                    return o.name.toLowerCase().indexOf(vm.filterString.toLowerCase()) !== -1 ||
                        o.description.toLowerCase().indexOf(vm.filterString.toLowerCase()) !== -1
                });
            }
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

