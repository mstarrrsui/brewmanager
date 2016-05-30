(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('userservice', userservice);

    userservice.$inject = ['$http', '$location', '$q', 'exception', 'logger'];
    /* @ngInject */
    function userservice($http, $location, $q, exception, logger) {

        var service = {
            //isLoggedIn: isLoggedIn,
            registerUser: registerUser
            //loginUser: loginUser,
            //logoutUser: logoutUser,
            //getUserInfo: getUserInfo
        };

        return service;

        function registerUser(userInfo) {

          var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }

            //var apiURL ='https://microsoft-apiappb8abebc3cac44655b692cf898ef41749.azurewebsites.net';
            var apiURL = 'http://localhost:33116';

            return $http.post(apiURL + '/api/account/register', userInfo, config)
                .then(registerUserComplete)
                .catch(registerUserError);
            
            function registerUserComplete(data, status, headers, config) {
                logger.debug("Successfully called register");
            }

            function registerUserError(e) {
                var newMessage = 'XHR Failed for register user'
                if (e.data && e.data.Result) {
                    newMessage = newMessage + '\n' + e.data.Result;
                }
                //e.data.description = newMessage;
                logger.error(newMessage);
                //exception.catcher('XHR Failed for register')(message.data.Result);
                return $q.reject(e);
            }

        }
        
        function getHops() {
            return $http.get('/api/hops')
                .then(getHopsComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getHops')(message);
                    $location.url('/');
                });

            function getHopsComplete(data, status, headers, config) {
                return data.data;
            }
        }

        
        function getRoles() {
            return $http.get('http://localhost/winauthapi/api/roles/getroles', {withCredentials: true})
                .then(getRolesComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getRoles')(message);
                    $location.url('/');
                });

            function getRolesComplete(data, status, headers, config) {
                return data.data;
            }
        }
   
    }
})();
