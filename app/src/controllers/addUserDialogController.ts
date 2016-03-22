/// <reference path="../_all.ts" />

module ContactManagerApp {

  export class AddUserDialogController {
    static $inject = ['$mdDialog'];
    
    constructor(private $mdDialog) {}
    
    user: CreateUser;
    
    cancel(): void {
      this.$mdDialog.cancel();
    }
    
    avatars=['svg-1','svg-2','svg-3','svg-4'];
    
    save(): void {
      this.$mdDialog.hide(this.user);
    }
  }
}