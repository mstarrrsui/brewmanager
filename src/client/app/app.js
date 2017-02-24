var brewapp;
(function (brewapp) {
    'use strict';
    angular.module('brewApp', [
        /* Shared modules */
        'app.core',
        'app.widgets',
        /* Feature areas */
        'app.ingredients',
        'app.account'
        //'app.dashboard',
        //'app.layout'
    ]);
})(brewapp || (brewapp = {}));
//# sourceMappingURL=app.js.map