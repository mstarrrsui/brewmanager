(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var readyPromise;

        var service = {
            getHops: getHops,
            getHop: getHop,
            ready: ready
        };

        return service;

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

        function getHop(id) {
            return $http.get('/api/hop/' + id)
                .then(getHopComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getHops')(message);
                    $location.url('/');
                });

            function getHopComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function() {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
