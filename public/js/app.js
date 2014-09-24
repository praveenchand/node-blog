'use strict';

var app = angular.module('nodeBlog', ['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
    .when('/signin', {
      templateUrl: 'public/views/signin.html'
    })
    .otherwise({
        redirectTo: '/signin'
      });
}]);

