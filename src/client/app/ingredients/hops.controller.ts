
namespace brewapp {
    'use strict';


    class HopsController  {

        public filterString: string = '';
        public filteredData: Array<any> = [];
        public data: Array<any> = [];
        public currPageData: Array<any> = [];
        public title: string = 'Hops';
        public currPage: number = 1;
        public pageSize: number = 20;
        public totalPages: number = -1;

        private dataservice: any;
        private logger: any;
        private hopsFilter: any;
        private http: angular.IHttpService;

        // HopsController.$inject = ['$scope', '$http', 'dataservice', 'logger', 'hopsFilter'];

        static $inject: Array<string> = ['$scope', '$http', 'dataservice', 'logger', 'hopsFilter'];

        // @ngInject
        constructor($scope: ng.IScope, $http: angular.IHttpService, dataservice: any, logger: any, hopsFilter: any) {
            this.dataservice = dataservice;
            this.logger = logger;
            this.hopsFilter = hopsFilter;

            this.http = $http;

            $scope.$watch(function() {
                return this.filterString;
            }, function(value: any) {
                console.log('filter:' + value);
                this.setCurrPageData(1);
            });

            this.activate();
        }

        private activate(): angular.IPromise<any> {
            return this.getHops().then(() => {
                this.setCurrPageData(1);
                this.logger.info('Activated Hops View');
            });

            // this.filterString = "blah";
        }

        public setCurrPageData(page: number): void {
            this.filterData();
            this.determineCurrPage(page);
        }

        private determineCurrPage(page: number): void {
            if (page > this.totalPages) {
                this.currPage = this.totalPages;
                return;
            } else if (page < 1) {
                this.currPage = 1;
                return;
            } else {
                this.currPage = page;
            }

            this.currPageData = _.slice(this.filteredData,
                ((this.currPage - 1) * this.pageSize),
                (this.currPage * this.pageSize));
        }


        public prevPage(): void {
            this.setCurrPageData(this.currPage - 1);
        }

        public nextPage(): void {
            this.setCurrPageData(this.currPage + 1);
        }

        public filterData(): void {
            this.filteredData = this.data;
            if (this.filterString !== '') {
                this.filteredData = _.filter(this.filteredData, function (o: any) {
                    return o.name.toLowerCase().indexOf(this.filterString.toLowerCase()) !== -1 ||
                        o.description.toLowerCase().indexOf(this.filterString.toLowerCase()) !== -1
                });
            }
            this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
        }

        public getHops(): angular.IPromise<any> {
            return this.dataservice.getHops().then( function(data: any) {
                this.data = data;
            });
        }

        public clickMe(hopsName: string): void {
            this.logger.info('Clicked on ' + hopsName + '!!!');
        }

    }

    angular
        .module('app.ingredients')
        .controller('HopsController', HopsController);

}

