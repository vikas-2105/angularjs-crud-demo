'use strict';

/**
 * @ngdoc function
 * @name angularjsCrudAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsCrudAppApp
 */
angular.module('angularjsCrudAppApp')
  .controller('UpdateController', function ($scope, $http, Scopes, $window) {
    
    if(Scopes.get('UpdateController')){
      let lastSnapshotOfScope = Scopes.get('UpdateController');
      $scope.idOfEmployeeToUpdate = lastSnapshotOfScope.idOfEmployeeToUpdate;
      $scope.employee_name = lastSnapshotOfScope.employee_name;
      $scope.employee_email = lastSnapshotOfScope.employee_email;
    }

    $scope.goBack = function(){
      $window.location.href = '/#';
    }

    $scope.updateData = function(){
      let postObject = {
          first_name: $scope.employee_name,
          last_name: "",
          email: $scope.employee_email
      };
      $http.put("https://reqres.in/api/users/" + $scope.idOfEmployeeToUpdate, postObject).then(function(response){
          let ListingControllerScope = Scopes.get('ListingController');
          angular.forEach(ListingControllerScope.employees, employee => {
              if(employee.id === $scope.idOfEmployeeToUpdate){
                  employee.first_name = response.data.first_name;
                  employee.last_name = response.data.last_name;
                  employee.email = response.data.email;
              }
          });
          $scope.idOfEmployeeToUpdate = '';
          $scope.employee_name = "";
          $scope.employee_email = "";
          Scopes.store('UpdateController', $scope);
          Scopes.store('ListingController', ListingControllerScope);
          $window.location.href = "#/";
      });
    }
  });
