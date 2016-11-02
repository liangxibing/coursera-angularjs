(function (){
'use strict';

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService', 'MenuService'];
function SignUpController (UserService, MenuService) {
  var signUpCtrl = this;

  signUpCtrl.submit = function () {
    MenuService.getMenuItemByShortName(signUpCtrl.user.favorite.short_name)
    .then(function (response) {
      signUpCtrl.user.favorite.name = response.name;
      signUpCtrl.user.favorite.description = response.description;
      UserService.saveUserInfo(signUpCtrl.user);
      signUpCtrl.errorMenuNum = false;
      signUpCtrl.completed = true;
    })
    .catch(function (errorResponse) {
      signUpCtrl.errorMenuNum = true;
    })
  };
}
})();
