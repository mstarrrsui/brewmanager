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

