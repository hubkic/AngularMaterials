/// <reference path="../_all.ts" />
var ContactManagerApp;
(function (ContactManagerApp) {
    var MyService = (function () {
        function MyService($http) {
            this.$http = $http;
        }
        MyService.prototype.getSomething = function () {
            return this.$http.get('http://localhost:8080/api/names')
                .then(function (response) { return response.data; });
        };
        return MyService;
    })();
    ContactManagerApp.MyService = MyService;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=someService.js.map