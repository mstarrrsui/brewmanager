(function() {
    'use strict';

    angular
        .module('app.ingredients')
        .controller('HopsEditController', HopsEditController);

    HopsEditController.$inject = ['$scope', '$http', '$routeParams', 'dataservice', 'logger', 'hopsFilter'];
    /* @ngInject */
    function HopsEditController($scope, $http, $routeParams, dataservice, logger) {
        var vm = this;
        vm.hopId = $routeParams.id;
        vm.hop = {};
        vm.editableHop = {};
        vm.submitForm = submitForm;
        vm.countries = [
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Canada', code: 'CA'},
            {name: 'China', code: 'CN'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'France', code: 'FR'},
            {name: 'Germany', code: 'DE'},
            {name: 'Japan', code: 'JP'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Poland', code: 'PL'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'U.S.', code: 'US'},
            {name: 'United Kingdom', code: 'UK'}
        ];


        activate();

        $scope.$watch(function () {
            return vm.editableHop.name;
        },function(value){
            console.log(value);
        });

        function activate() {
            return dataservice.getHop(vm.hopId).then(function(data) {
                vm.hop = data;
                vm.editableHop = angular.copy(vm.hop);
                logger.info('Activated Hops Edit View');
            });
        }

        function submitForm() {
            vm.hop = angular.copy(vm.editableHop);
        }

    }
})();

