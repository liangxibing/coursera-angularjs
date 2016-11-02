(function () {
'use strict';

angular.module('common')
.service('UserService', UserService);

UserService.$inject = [];
function UserService() {
  var service = this;
  var user_info;

  service.saveUserInfo = function (user) {
    user_info = user;
  };

  service.getUserInfo = function () {
    return user_info;
  };
}
})();
