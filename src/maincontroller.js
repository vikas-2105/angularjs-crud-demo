app.controller("mainController", function($scope, $http){
    $scope.page = 0;
    $scope.employees = [];
    $scope.isLoading = true;
    $scope.isAddDataContainerOpen = false;
    $scope.isUpdateDataContainerOpen = false;

    $scope.fetchData = function(){
        $scope.page = $scope.page + 1;
        $scope.isLoading = true;
        $http.get("https://reqres.in/api/users?page=" + $scope.page).then(function(response){
            $scope.isLoading = false;
            $scope.employees = $scope.employees.concat(response.data.data);
            $scope.page = response.data.page;
            $scope.total_pages = response.data.total_pages;
        });
    }

    $scope.addNewData = function(){
        let postObject = {
            first_name: $scope.employee_name,
            last_name: "",
            email: $scope.employee_email
        };
        $scope.isAddDataContainerOpen = false;
        $http.post("https://reqres.in/api/users", postObject).then(function(response){
            let data = {
                id: parseInt(response.data.id),
                avatar: "https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg",
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name
            }
            $scope.employees.push(data);
            $scope.employee_name = "";
            $scope.employee_email = ""
        });
    }

    $scope.updateData = function(){
        let postObject = {
            first_name: $scope.employee_name,
            last_name: "",
            email: $scope.employee_email
        };
        $scope.isUpdateDataContainerOpen = false;
        $http.put("https://reqres.in/api/users/" + $scope.idOfEmployeeToUpdate, postObject).then(function(response){
            angular.forEach($scope.employees, employee => {
                if(employee.id === $scope.idOfEmployeeToUpdate){
                    employee.first_name = response.data.first_name;
                    employee.last_name = response.data.last_name;
                    employee.email = response.data.email;
                }
            });
            $scope.idOfEmployeeToUpdate = '';
            $scope.employee_name = "";
            $scope.employee_email = ""
        });
    }

    $scope.deleteData = function(id, index){
        $http.delete("https://reqres.in/api/users/" + id).then(function(response){
            $scope.employees.splice(index, 1);
        });
    }

    $scope.addButtonClicked = function(){
        $scope.isAddDataContainerOpen = true;
    }

    $scope.updateButtonClicked = function(firstName, lastName, email, id){
        $scope.employee_name = firstName + " " + lastName;
        $scope.employee_email = email;
        $scope.idOfEmployeeToUpdate = id
        $scope.isUpdateDataContainerOpen = true;
    }
})