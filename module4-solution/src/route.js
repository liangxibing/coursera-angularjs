(function () {
'use strict';

angular.module("MenuApp")
.config(RouteConfig);

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RouteConfig ($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'MainCategoriesController as mainCategories',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items page
  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menuapp/templates/main-items.template.html',
    controller: 'MainItemsController as mainItems',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
             function ($stateParams, MenuDataService) {
               return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
             }]
    }
  });
}

})();
