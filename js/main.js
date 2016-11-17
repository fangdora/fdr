'use strict';

var app = angular.module('myApp',['ui.bootstrap','ngMaterial','ui.router','ngAnimate','ngResource']);
/**
app.controller('SearchController',['$scope',function($scope){
    
}]);**/
app.config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
        .primaryPalette('grey',{
            'default':'800'
    })
        .accentPalette('orange');
});

app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
    $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    $stateProvider        
        .state('app',{
            url:'/',
            templateUrl:'views/loc.html',
            controller:'SearchController'               
        })
        .state('contact',{
            url:'/contact',
            templateUrl:'views/contact.html',
            controller:'contactController'      
        })               
    
    /**
    $stateProvider
        .state('home',{
            url:'/',
            views:{
                'searchset':{
                    template:'<h1>To be Completed</h1>'                   
                },
                'searchresult':{
                    template:'<h1>To be Completed</h1>'
                },
                'card':{
                    template:'<h1>To be Completed</h1>'
                }
            }
    });**/
    $urlRouterProvider.otherwise('/');
});
