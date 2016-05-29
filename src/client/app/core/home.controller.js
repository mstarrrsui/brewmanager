(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$http', 'dataservice', 'logger', 'exception'];
    /* @ngInject */
    function HomeController($scope, $http, dataservice, logger, exception) {
        var vm = this;
        vm.getRoles = getRoles;
        vm.regemail = null;
        vm.regpwd = null;
        vm.regpwdconfirm = null;
        vm.username = null;
        vm.password = null;
        vm.submitRegister = submitRegister;
        vm.submitLogin = submitLogin;
        vm.results = null;
 

        function submitRegister() {
            logger.info('Clicked on register!!  email:' + vm.regemail);
            registerUser();
        }

        function submitLogin() {
            logger.info('Clicked on login!!');
        }

        function registerUser() {

            var data = {
                Email: vm.regemail,
                Password: vm.regpwd,
                ConfirmPassword: vm.regpwdconfirm
            };

            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }

            //var apiURL ='https://microsoft-apiappb8abebc3cac44655b692cf898ef41749.azurewebsites.net';
            var apiURL = 'http://localhost:33116';
            
            $http.post(apiURL + '/api/account/register', data, config)
                .then(function (data, status, headers, config) {
                    logger.info("Successfully called register");
                })
                .catch(function(message) {
                    exception.catcher('XHR Failed for register')(message);
                });


        }

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
    }
})();

