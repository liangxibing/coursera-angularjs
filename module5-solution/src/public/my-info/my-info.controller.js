(function () {
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userInfo', 'ApiPath'];
function MyInfoController (userInfo, ApiPath) {
  var myInfoCtrl = this;
  myInfoCtrl.userInfo = userInfo;
  myInfoCtrl.ApiPath = ApiPath;
}

})();
