var brewapp;
(function (brewapp) {
    'use strict';
    var HopsController = (function () {
        // @ngInject
        function HopsController($scope, $http, dataservice, logger, hopsFilter) {
            this.filterString = '';
            this.filteredData = [];
            this.data = [];
            this.currPageData = [];
            this.title = 'Hops';
            this.currPage = 1;
            this.pageSize = 20;
            this.totalPages = -1;
            this.dataservice = dataservice;
            this.logger = logger;
            this.hopsFilter = hopsFilter;
            this.http = $http;
            $scope.$watch(function () {
                return this.filterString;
            }, function (value) {
                console.log('filter:' + value);
                this.setCurrPageData(1);
            });
            this.activate();
        }
        HopsController.prototype.activate = function () {
            var _this = this;
            return this.getHops().then(function () {
                _this.setCurrPageData(1);
                _this.logger.info('Activated Hops View');
            });
            // this.filterString = "blah";
        };
        HopsController.prototype.setCurrPageData = function (page) {
            this.filterData();
            this.determineCurrPage(page);
        };
        HopsController.prototype.determineCurrPage = function (page) {
            if (page > this.totalPages) {
                this.currPage = this.totalPages;
                return;
            }
            else if (page < 1) {
                this.currPage = 1;
                return;
            }
            else {
                this.currPage = page;
            }
            this.currPageData = _.slice(this.filteredData, ((this.currPage - 1) * this.pageSize), (this.currPage * this.pageSize));
        };
        HopsController.prototype.prevPage = function () {
            this.setCurrPageData(this.currPage - 1);
        };
        HopsController.prototype.nextPage = function () {
            this.setCurrPageData(this.currPage + 1);
        };
        HopsController.prototype.filterData = function () {
            this.filteredData = this.data;
            if (this.filterString !== '') {
                this.filteredData = _.filter(this.filteredData, function (o) {
                    return o.name.toLowerCase().indexOf(this.filterString.toLowerCase()) !== -1 ||
                        o.description.toLowerCase().indexOf(this.filterString.toLowerCase()) !== -1;
                });
            }
            this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
        };
        HopsController.prototype.getHops = function () {
            return this.dataservice.getHops().then(function (data) {
                this.data = data;
            });
        };
        HopsController.prototype.clickMe = function (hopsName) {
            this.logger.info('Clicked on ' + hopsName + '!!!');
        };
        return HopsController;
    }());
    // HopsController.$inject = ['$scope', '$http', 'dataservice', 'logger', 'hopsFilter'];
    HopsController.$inject = ['$scope', '$http', 'dataservice', 'logger', 'hopsFilter'];
    angular
        .module('app.ingredients')
        .controller('HopsController', HopsController);
})(brewapp || (brewapp = {}));
//# sourceMappingURL=hops.controller.js.map