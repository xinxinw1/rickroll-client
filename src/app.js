'use strict';

// Declare app level module which depends on views, and components
angular.module('rickroll', [
  'ngMaterial',
  'ngRoute'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  
  $routeProvider
  .when('/create', {
    templateUrl: 'create/create.html',
    controller: 'CreateCtrl'
  })
  .otherwise({redirectTo: '/create'});
}]);
