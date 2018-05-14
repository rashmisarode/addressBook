app.service('myAddressBookService', function($http) {
	
    this.getAddresses = function (onResponse) {
			var selectorJson  = {
 				    "selector": {},
 				    "fields": ["_id","_rev", "Name", "Contact", "Email"],
 				    "sort": [],
 				    "limit": 10,
 				    "skip": 0
 				}
 			return $http.post("http://localhost:5984/addresses/_find", selectorJson, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'} })
 	        .then(function (response) {
 	             console.log("Response from CouchDb "+JSON.stringify(response.data));
 	            onResponse(response.data.docs)
 	        });		
    }
    
    
    this.addAddress = function (name, phone, email) {
    	
    	console.log("Name "+name);
    	console.log("Contact "+phone);
  	  var data = {
              "Name": name,
              "Contact": phone,
              "Email": email
          };

	  $http.post("http://localhost:5984/addresses", data, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'} })
          .then(function (data, status, headers) {
          	console.log(data);
          }, function errorCallback(response) {
              alert(response);
            });
    	
    }
    
});