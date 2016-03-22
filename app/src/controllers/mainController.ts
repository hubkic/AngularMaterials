/// <reference path="../_all.ts" />

module ContactManagerApp{
    export class MainController{
        static $inject =['someService',
                         'userService',
                         '$mdSidenav',
                         '$mdToast',
                         '$mdDialog',
                         '$mdMedia',
                         '$mdBottomSheet'];
        
        constructor(
            private someService: IMyService,
            private userService: IUserService,
            private $mdSidenav: angular.material.ISidenavService,
            private $mdToast: angular.material.IToastService,
            private $mdDialog: angular.material.IDialogService,
            private $mdMedia: angular.material.IMedia,
            private $mdBottomSheet: angular.material.IBottomSheetService
            ) 
        {
            var self = this;
            this.userService
            .loadAllUsers()
            .then((users: User[]) => {
                self.users = users;
                self.selected = users[0];
                self.userService.selectedUser = this.selected;
                console.log(self.users);
            });    
            
        }
        
        tabIndex: number = 0;
        searchText: string = '';
        users: User[] = [];
        selected: User = null;
        
            
        newNote: Note = new Note('',null);
        
        addNote():void{
            this.selected.notes.push(this.newNote);
            
            //reset the form
            this.formScope.noteForm.$setUntouched();
            this.formScope.noteForm.$setPristine();
            
            this.newNote = new Note('',null);
            this.openToast('Note added!');
        }
        
        formScope: any;
        
        setFormScope(scope){
            this.formScope = scope;
        }
        
        addUser($event){
            var self = this;
            var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));
            this.$mdDialog.show({
                templateUrl: './dist/view/newUserDialog.html',
                parent:angular.element(document.body),
                targetEvent: $event,
                controller: AddUserDialogController, 
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            }).then((user: CreateUser)=>{
                var newUser: User = User.fromCreate(user);
                self.users.push(newUser);
               self.openToast('User added');
            },()=>{
               console.log('Cancel Dialog'); 
            }); 
        }
            
        toggleSideNav() : void{
            this.$mdSidenav('left').toggle();
        }
        
        selectUser(user: User):void{
            this.selected = user;
            var sidenav = this.$mdSidenav('left');
            if(sidenav.isOpen()){
                sidenav.close();
            }
            
            this.tabIndex = 0;
        }
        
        removeNote(note: Note){
            var foundIndex = this.selected.notes.indexOf(note);
            this.selected.notes.splice(foundIndex,1);
            this.openToast("Note was removed");
        }
        
        showContactOptions($event){
            this.$mdBottomSheet.show({
                parent: angular.element(document.getElementById('wrapper')),
                templateUrl: './dist/view/contact-sheet.html',
                controller: ContactPanelController,
                controllerAs: 'cp',
                bindToController: true,
                targetEvent: $event
            }).then((clickItem)=>{
                clickItem && console.log(clickItem.name+" Clicked!");
            })
        }
        
        clearNotes($event){
            var confirm = this.$mdDialog.confirm().title("Are you sure you want delete all notes?")       
                .textContent('All notes will be deleted, you can\'t undo this action.')
                .targetEvent($event)
                .ok('Yes')
                .cancel('No');
                
           var self = this;
           this.$mdDialog.show(confirm).then(
               ()=> {
                   self.selected.notes= [];
                   self.openToast('Cleared notes');
               }
           );    
        }
        
        openToast(message: string) : void{
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(message)
                    .position('top')
                    .hideDelay(3000)
            );
        }
    }
}