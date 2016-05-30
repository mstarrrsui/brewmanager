(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope','$http', 'userservice', 'logger'];
    /* @ngInject */
    function RegisterController($scope, $http, userservice, logger) {
        var vm = this;
        vm.submitRegister = submitRegister;
        vm.regemail = null;
        vm.regpwd = null;
        vm.regpwdconfirm = null;
        vm.lastname = null;
        vm.firstname = null;
        vm.errorMessages = null;



        function submitRegister() {

            vm.errorMessages = null;
            
            var userinfo = {
                Email: vm.regemail,
                Password: vm.regpwd,
                ConfirmPassword: vm.regpwdconfirm,
                FirstName: vm.firstname,
                LastName: vm.lastname
            };
            return userservice.registerUser(userinfo)
                .catch(function(e) {
                    //logger.error('An error occurred');

                    //todo - populate viewmodel objects with errors
                    vm.errorMessages = angular.copy(e.data.Errors);

                });
        }
    }
})();

