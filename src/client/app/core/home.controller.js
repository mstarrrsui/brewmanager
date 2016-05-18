(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$http', 'dataservice', 'logger', 'hopsFilter'];
    /* @ngInject */
    function HomeController($scope, $http, dataservice, logger, hopsFilter) {
        var vm = this;
        vm.getRoles = getRoles;
        vm.data = null;

       
        function getRoles() {
            //logger.info('Clicked on button!!');
            vm.data = null;
            setTimeout(function() {
                getRolesViaApi().then(function () {
                    logger.info('Got Data');
                });
            }, 10);
        }

        function getRolesViaApi() {
            return dataservice.getRoles().then(function (data) {
                vm.data = data;
            });
        }

        function clickMe(hopsName) {
            logger.info('Clicked on ' + hopsName + '!!!');
        }
    }
})();

