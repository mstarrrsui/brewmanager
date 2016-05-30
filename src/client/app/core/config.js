(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[BrewManager Error] ', //Configure the exceptionHandler decorator
        appTitle: 'BrewManager',
        imageBasePath: '/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$compileProvider', '$logProvider', '$routeProvider', '$locationProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure ($compileProvider, $logProvider,
                        $routeProvider, $locationProvider,
                        exceptionHandlerProvider) {
        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        //configureStateHelper();

        /////////

        $routeProvider.when('/login',
            {
                templateUrl:'app/account/login.html',
                controller:'LoginController',
                controllerAs:'vm'
            })

        $routeProvider.when('/register',
            {
                templateUrl:'app/account/register.html',
                controller:'RegisterController',
                controllerAs:'vm'
            })
        
        $routeProvider.when('/hops',
            {
                templateUrl:'app/ingredients/hops.html',
                controller:'HopsController',
                controllerAs:'vm'
            })

        $routeProvider.when('/hops/:id',
            {
                templateUrl:'app/ingredients/hops.edit.html',
                controller:'HopsEditController',
                controllerAs:'vm'
            })

        $routeProvider.otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
        ////////////////

        /*function configureStateHelper() {
            var resolveAlways = {
                ready: ready
            };

            ready.$inject = ['dataservice'];
            function ready(dataservice) {
                return dataservice.ready();
            }

            routerHelperProvider.configure({
                docTitle: 'Gulp: ',
                resolveAlways: resolveAlways
            });
        }*/
    }
})();
