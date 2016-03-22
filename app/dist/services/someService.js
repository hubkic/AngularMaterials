/// <reference path="../_all.ts" />
var ContactManagerApp;
(function (ContactManagerApp) {
    var MyService = (function () {
        function MyService($http, $location) {
            this.http = $http;
            this.location = $location;
        }
        MyService.prototype.GetAll = function (successCallback) {
            this.http.get(this.location.absUrl()).success(function (data, status) {
                successCallback(data);
            }).error(function (error) {
                successCallback(error);
            });
        };
        return MyService;
    })();
    ContactManagerApp.MyService = MyService;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=someService.js.map