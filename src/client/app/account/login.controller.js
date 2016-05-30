(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$http', 'userservice', 'logger'];
    /* @ngInject */
    function LoginController($scope, $http, userservice, logger) {
        var vm = this;

        

        
    }
})();

