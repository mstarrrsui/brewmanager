(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$http', 'dataservice', 'userservice', 'logger', 'exception', '$sessionStorage'];
    /* @ngInject */
    function HomeController($scope, $http, dataservice, userservice, logger, exception, $sessionStorage) {
        var vm = this;
        vm.getRoles = getRoles;
        vm.regemail = null;
        vm.regpwd = null;
        vm.regpwdconfirm = null;
        vm.username = null;
        vm.password = null;
        vm.submitRegister = submitRegister;
        vm.getToken = getToken;
        vm.results = null;
 

        function submitRegister() {
            var userinfo = {
                Email: vm.regemail,
                Password: vm.regpwd,
                ConfirmPassword: vm.regpwdconfirm
            };
            return registerUser(userinfo).then(function() {
                logger.info('User registered');
            });
        }

        function getToken() {
            getTokenFromAPI();
        }


        function getTokenFromAPI() {

            var data = $.param({
                grant_type: 'password',
                username: vm.username,
                password: vm.password
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }

            //var apiURL ='https://microsoft-apiappb8abebc3cac44655b692cf898ef41749.azurewebsites.net';
            var apiURL = 'http://localhost:33116';

            $http.post(apiURL + '/token', data, config)
                .then(function (data, status, headers, config) {
                    logger.info("Successfully called gettoken!");
                    $sessionStorage.userdata = data;

                })
                .catch(function(message) {
                    exception.catcher('XHR Failed for gettoken')(message);
                });


        }

        
    }
})();

