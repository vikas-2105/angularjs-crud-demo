'use strict';

/**
 * @ngdoc function
 * @name angularjsCrudAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularjsCrudAppApp
 */
angular.module('angularjsCrudAppApp')
  .controller('ListingController', function ($scope, $http, Scopes, $window) {

    if(Scopes.get('ListingController')){
      let lastSnapshotOfScope = Scopes.get('ListingController');
      $scope.page = lastSnapshotOfScope.page;
      $scope.employees = lastSnapshotOfScope.employees;
      $scope.isLoading = lastSnapshotOfScope.isLoading;
      $scope.total_pages = lastSnapshotOfScope.total_pages;
    }else{
      $scope.page = 0;
      $scope.employees = [];
      $scope.isLoading = true;
      $scope.total_pages = 1;
      Scopes.store('ListingController', $scope);
    }

    $scope.init = function(){
      let listedEmployees = Scopes.get('ListingController').employees;
      if(listedEmployees.length === 0){
        $scope.fetchData();
      }
    };

    $scope.fetchData = function(){
      $scope.page = $scope.page + 1;
      $scope.isLoading = true;
      $http.get("https://reqres.in/api/users?page=" + $scope.page).then(function(response){
          $scope.isLoading = false;
          $scope.employees = $scope.employees.concat(response.data.data);
          $scope.page = response.data.page;
          $scope.total_pages = response.data.total_pages;
          Scopes.store('ListingController', $scope);
      });
    }

    $scope.updateButtonClicked = function(firstName, lastName, email, id){
      let updateControllerSnapshot = {};
      if(Scopes.get('UpdateController')){
        updateControllerSnapshot = Scopes.get('UpdateController');
      }
      updateControllerSnapshot.employee_name = firstName + " " + lastName;
      updateControllerSnapshot.employee_email = email;
      updateControllerSnapshot.idOfEmployeeToUpdate = id;
      Scopes.store('UpdateController', updateControllerSnapshot);
      $window.location.href = "#/update"
    }

    $scope.deleteData = function(id, index){
      $http.delete("https://reqres.in/api/users/" + id).then(function(response){
          $scope.employees.splice(index, 1);
      });
      Scopes.store('ListingController', $scope);
    }
  });
