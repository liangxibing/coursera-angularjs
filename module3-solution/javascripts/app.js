(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
    var narrow = this;

    narrow.searchTerm = "";
    narrow.found = [];
    narrow.clicked = false;

    narrow.narrowDown = function () {
      MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
      .then(function (result) {
        narrow.found = result;
        narrow.clicked = true;
      });
    }

    narrow.removeItem = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService ($http, ApiBasePath) {
    var service = this;
    var foundItems = [];

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json/")
      })
      .then(function (result) {
        foundItems = [];
        var responseItem = {};
        var foundItem = {};

        for (var index = 0; index < result.data.menu_items.length; ++index) {
          responseItem = result.data.menu_items[index];
          if ("" !== searchTerm && responseItem.description.indexOf(searchTerm) !== -1) {
            foundItem = {
              name: responseItem.name,
              short_name: responseItem.short_name,
              description: responseItem.description
            }
            foundItems.push(foundItem);
          }
        }
        return foundItems;
      });
    };

    service.removeItem = function (itemIndex) {
      foundItems.splice(itemIndex, 1);
    };
  }

  function FoundItems () {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        foundItems: "<",
        clicked: "<",
        onRemove: "&"
      }
    };

    return ddo;
  }
})();
