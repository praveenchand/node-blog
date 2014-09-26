'use strict';

var app = angular.module('nodeBlog', ['ngRoute','ui.bootstrap','ngResource']);

app.config(['$routeProvider', '$locationProvider',function($routeProvider,$locationProvider){

	$routeProvider
    .when("/signin", {
      templateUrl: "views/signin.html"
    })
    .when("/signup",{
        templateUrl: "views/signup.html"
    })
    .otherwise({
    	redirectTo:"/signin"
    })

}]);



app.controller('ProfileCntrl',['$scope','$http',
		function($scope,$http){
		$scope.username = "";
		   $http({method:'GET',url:"/auth/info"}).
		    	success(function(data,status){
		    		$scope.username = data.email;
		    		console.log(data);
		    	})
	}
]);


