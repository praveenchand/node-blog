'use strict';

var app = angular.module('nodeBlog', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',function($routeProvider,$locationProvider){

	$routeProvider
    .when("/signin", {
      templateUrl: "views/signin.html"
    })
    .when("/signup",{
        templateUrl: "views/signup.html"
    })
    .otherwise({
        redirectTo: "/signin"
      });
}]);



