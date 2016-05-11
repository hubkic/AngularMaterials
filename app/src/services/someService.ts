/// <reference path="../_all.ts" />

module ContactManagerApp {
    export interface IMyService {
        getSomething(): ng.IPromise<Name[]>;
    }
 
    export class MyService {
        
        constructor(private $http: ng.IHttpService) {
        }

        getSomething(): ng.IPromise<Name[]> {          
            return this.$http.get('http://localhost:8080/api/na mes')
                    .then(response => response.data);
        }
    }
}