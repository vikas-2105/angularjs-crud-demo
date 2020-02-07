'use strict';

/**
 * @ngdoc function
 * @name angularjsCrudAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularjsCrudAppApp
 */
angular.module('angularjsCrudAppApp')
  .controller('AddController', function ($scope, $http, Scopes, $window) {

    $scope.goBack = function(){
      $window.location.href = '/#';
    }

    $scope.addNewData = function(){
      let postObject = {
          first_name: $scope.employee_name,
          last_name: "",
          email: $scope.employee_email
      };
      $http.post("https://reqres.in/api/users", postObject).then(function(response){
          let data = {
              id: parseInt(response.data.id),
              avatar: "https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg",
              email: response.data.email,
              first_name: response.data.first_name,
              last_name: response.data.last_name
          }
          let ListingControllerScope = Scopes.get('ListingController');
          ListingControllerScope.employees.push(data);
          Scopes.store('ListingController', ListingControllerScope);
          $scope.employee_name = "";
          $scope.employee_email = "";
          $window.location.href = "#/";
      });
    }
  });
