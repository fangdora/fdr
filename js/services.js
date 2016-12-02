var app = angular.module('myApp');

app.service('xqSearch',['$http',function($http){
    
    this.searchXqbyFacility = function(str){        
        return $http.get('/search/getFxResult?' + str);
    };
    
    this.searchXqbyName = function(xqmc){
        return $http.get('/search/getXqInfo?' + xqmc ); 
    }; 
    
    this.searchXqDetail = function(xqbh){
        return $http.get('/search/getXqDetail?' + xqbh);
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


app.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
});