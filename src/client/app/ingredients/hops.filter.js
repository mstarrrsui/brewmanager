(function() {
   'use strict';

    angular
        .module('app.ingredients')
        .filter('hops', function() {
            return function(inputArray, searchCriteria) {
                //console.log('filter called');
                if (!angular.isDefined(searchCriteria) || searchCriteria === '') {
                    return inputArray;
                }
                var data = [];
                angular.forEach(inputArray, function (item) {

                    if (item.name.toLowerCase().indexOf(searchCriteria.toLowerCase()) !== -1) {
                        data.push(item);
                    }

                });
                return data;
            };
        });
})();

