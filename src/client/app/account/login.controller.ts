(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$http', 'userservice', 'logger'];
    /* @ngInject */
    function LoginController($scope: any, $http: any, userservice: any, logger: any) {
        var vm = this;

        

        
    }
})();

