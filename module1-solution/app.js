(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchItems = "";
  $scope.lunchCheckMSG = "";

  $scope.lunchCheck = function () {
    if ($scope.lunchItems === "")
      $scope.lunchCheckMSG = "Please enter data first";
    else {
      var splittedLunchItems = $scope.lunchItems.split(',');
      if (splittedLunchItems.length <= 3)
        $scope.lunchCheckMSG = "Enjoy!";
      else
        $scope.lunchCheckMSG = "Too much!";
    }
  }
}
})();
