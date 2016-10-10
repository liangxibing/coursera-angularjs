(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.toBuyItems = ShoppingListCheckOffService.showToBuyItems();

    toBuy.buy = function (itemIndex) {
      ShoppingListCheckOffService.buy(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.showAlreadyBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyList = [
      {
        name: "chocolate",
        quantity: 2
      },
      {
        name: "milk",
        quantity: 20
      },
      {
        name: "bread",
        quantity: 10
      },
      {
        name: "cookies",
        quantity: 100
      },
      {
        name: "noodle",
        quantity: 5
      }
    ];
    var alreadyBoughtList = [];

    service.buy = function (itemIndex) {
      var updatedToBuyList = toBuyList.splice(itemIndex, 1);
      for (var i = 0; i < updatedToBuyList.length; ++i)
        alreadyBoughtList.push(updatedToBuyList[i]);
    };

    service.showToBuyItems = function () {
      return toBuyList;
    };

    service.showAlreadyBoughtItems = function () {
      return alreadyBoughtList;
    };
  }
})();
