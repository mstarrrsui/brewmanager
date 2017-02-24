(function() {
'use strict';

interface IErrorPrefixSvc {
    getPrefix(): string;
}

class ErrorPrefixServiceProvider implements ng.IServiceProvider {

    private prefix = "BrewManager:";

    // Configuration function
    public setPrefix(prefix: string) {
        this.prefix = prefix;
    }

    // Provider's factory function
    public $get() : IErrorPrefixSvc {
        return {
            getPrefix: () => { return this.prefix; }
        };
    }
}




config.$inject = ['$provide'];
/**
 * Configure by setting an optional string value for appErrorPrefix.
 * Accessible via config.appErrorPrefix (via config value).
 * @param  {[type]} $provide
 * @return {[type]}
 * @ngInject
 */
function config($provide:any) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

/**
 * Extend the $exceptionHandler service to also display a toast.
 * @param  {Object} $delegate
 * @param  {Object} exceptionHandler
 * @param  {Object} logger
 * @return {Function} the decorated $exceptionHandler service
 */
extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger'];
/* @ngInject */
function extendExceptionHandler($delegate:any, exceptionHandler:IErrorPrefixSvc, logger:any) {
    return function(exception:any, cause:any) {
        var appErrorPrefix = exceptionHandler.getPrefix() || '';
        var errorData = {exception: exception, cause: cause};
        exception.message = appErrorPrefix + exception.message;
        $delegate(exception, cause);
        /**
         * Could add the error to a service's collection,
         * add errors to $rootScope, log errors to remote web server,
         * or log locally. Or throw hard. It is entirely up to you.
         * throw exception;
         *
         * @example
         *     throw { message: 'error message we added' };
         */
        logger.error(exception.message, errorData);
    };
}

angular
    .module('blocks.exception')
    .provider('exceptionHandler', ErrorPrefixServiceProvider)
    .config(config);
})();