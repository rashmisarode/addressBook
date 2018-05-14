		var app = angular.module("addrBook", []);
		app.controller("myCtrl", function($scope, $http, myAddressBookService) {
			
	        $scope.phonePattern = /^\+?\d{10}$/;
	        $scope.emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

			
			var onResponse = function (docs) {
            	$scope.info = docs;
            }
			
            myAddressBookService.getAddresses(onResponse);
         
         
        
            $scope.addItem = function() {
            	console.log("in Add Item");            	
            	myAddressBookService.addAddress($scope.newName, $scope.newPhone, $scope.newEmail)
            	clearFields();
			}
							

			$scope.removeAddress = function(objectId, revID) {
				console.log("id to be deleted = "+objectId);
				console.log("Revision ID"+revID);
				var url = "http://localhost:5984/addresses/"+objectId+"?rev="+revID
				console.log("Delete URL = "+url);
				try {
					$http.delete(url).then(function(response){
						console.log(response);
						 myAddressBookService.getAddresses(onResponse);
						
					}, function(response){
						console.log(response);
					});	
				} catch(err) {
					console.log(err);
				}
			};
			
			var clearFields  =  function () {
				$scope.newName = "";
				$scope.newPhone = "";
				$scope.newEmail = "";
				$scope.id="";
				$scope.rev="";
				$scope.myUpdateSwitch=true;
				$scope.myAddSwitch=false;
			}
			
			$scope.editAddress = function(key, objectId, revId) {
				//revToBeUpdated = revId;
				console.log("key to be edited = "+objectId);
				console.log("rev to be edited = "+revId);
				console.log($scope.info);
 				$scope.newName = $scope.info[key].Name;
				$scope.newPhone = $scope.info[key].Contact;
				$scope.newEmail = $scope.info[key].Email;
				$scope.id = objectId;
				$scope.rev = revId;
				$scope.myUpdateSwitch=false;
				$scope.myAddSwitch=true;
				
				myAddressBookService.getAddresses(onResponse);
			};
			
			
			$scope.updateItem = function() {
				var objectId = $scope.id;
				//console.log("revToBeUpdated = "+revToBeUpdated);
				console.log("id to be updated = "+objectId);
				console.log("revid to be updated = "+$scope.rev);
				
				 var data = {
						    _rev: $scope.rev,
						    Name: $scope.newName,
			                Contact: $scope.newPhone,
			                Email: $scope.newEmail
			            };
			        
			      
			            
			            $http.put("http://localhost:5984/addresses/"+objectId, data, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'} })
			            .then(function (data, status, headers) {
			            	console.log(data);
			            	myAddressBookService.getAddresses(onResponse);
			            	
			                //$scope.info = data;
			            }, function errorCallback(response) {
			                alert(response);
			              });

			            clearFields();
			            
			}
		});
	