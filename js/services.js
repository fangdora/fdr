var app = angular.module('myApp');

app.service('xqSearch',['$http',function($http){
    
    this.searchXqbyFacility = function(str){        
        return $http.get('/search/getFxResult?' + str);
    };
    
    this.searchXqbyName = function(xqmc){
        return $http.get('/search/getXqInfo?' + xqmc ); 
    }; 
   
}]);

app.service('userService',['$resource',function($resource){
    var Advise = $resource('/search/saveAdvise');
    this.sendAdvise = function(name,email,content){
        var advise = new Advise();
        advise.name = name;
        advise.email = email;
        advise.content = content;
        advise.$save();
    };
}]);