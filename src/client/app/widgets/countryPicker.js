(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('countryPicker', CountryPicker);

    /* @ngInject */
    function CountryPicker () {

        var directive = {
            scope: {
                'selected': '=',
            },
            templateUrl: 'app/widgets/countryPicker.html',
            restrict: 'E',
            replace: true,
            link: linkFunction
        };

        function linkFunction(scope,elem,attrs) {
            scope.countries = [
                {name: 'Australia', code: 'AU'},
                {name: 'Austria', code: 'AT'},
                {name: 'Canada', code: 'CA'},
                {name: 'China', code: 'CN'},
                {name: 'Czech Republic', code: 'CZ'},
                {name: 'France', code: 'FR'},
                {name: 'Germany', code: 'DE'},
                {name: 'Japan', code: 'JP'},
                {name: 'New Zealand', code: 'NZ'},
                {name: 'Poland', code: 'PL'},
                {name: 'Slovenia', code: 'SI'},
                {name: 'U.S.', code: 'US'},
                {name: 'United Kingdom', code: 'UK'}
            ];
        }


        return directive;
    }
})();
