'use strict';

/**
 * @ngdoc overview
 * @name angularjsCrudAppApp
 * @description
 * # angularjsCrudAppApp
 *
 * Main module of the application.
 */
angular
  .module('angularjsCrudAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]).factory('Scopes', function ($rootScope) {
    var mem = {};
    
    return {
        store: function (key, value) {
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
  })
  .config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode({
    //   enabled:true
    // });
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddController',
      })
      .when('/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdateController',
      })
      .when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListingController',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
