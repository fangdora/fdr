'use strict';

var app = angular.module('myApp');
app.controller('SearchController',['$scope','xqSearch','$mdToast',function($scope,xqSearch,$mdToast){                
    
    $scope.ptstr = false;
    $scope.resultShow = false;
    var regions = [];
    /**
    xqSearch.searchXqbyName('xqmc=桃园')
    .then(
        function(response){
            regions = response.data;  
            refreshPages();
        }
    );
    **/
    
    $scope.setPage = function (pageNo) {
        //$scope.currentPage = pageNo;
        var start  = ($scope.currentPage-1)*10;
        var end = start + 10;
        $scope.subRegions = regions.slice(start,end);
    };

    $scope.pageChanged = function(num) {
        //$log.log('Page changed to: ' + $scope.currentPage);
        var start  = (num-1)*10;
        var end = start + 10;
        $scope.subRegions = regions.slice(start,end);
        $scope.str = num;
    };   
    
    var refreshPages = function(){
        $scope.totalItems = regions.length;
        $scope.currentPage = 1;
        $scope.maxSize = 5 ;
        $scope.numPages = $scope.maxSize;
        $scope.d = $scope.numPages;                    
        var start  = ($scope.currentPage-1)*10;
        var end = start + 10;
        $scope.subRegions = regions.slice(start,end);        
    }

    $scope.searchXq = function(){
        //regions = xqSearch.searchXqbyName($scope.xqName); 
        xqSearch.searchXqbyName("xqmc=" + $scope.xqName)
        .then(
            function(response){
                regions = response.data;                
                refreshPages();   
            }
        );       
             
    };
    
    
    $scope.loc_sel = {
        metro:false,
        spms:false,
        school:false,
        region:false,
        price:false,
        price_define:false,
        userRegion:'',
        userMetro:'',
        userMetroDis:'',
        userSpm:'',
        userSpmDis:'',
        userXx:false,
        userCz:false,
        userPrice:'',
        price_from:30000,
        price_to:50000,
        price_from_dis:true,
        price_to_dis:true
    };    
    
        
    $scope.spms = ('沃尔玛 家乐福 永旺 华润万家 山姆 新一佳').split(' ').map(function (spm) { return { abbrev: spm }; });
        
    $scope.distances = ('步行3分钟内 步行5分钟内 步行10分钟内').split(' ').map(function (dis) { return { abbrev: dis }; });    
   
    $scope.regions = ('罗湖区 福田区 南山区 盐田区 宝安区 龙岗区 龙华区 坪山区 大鹏新区 光明新区').split(' ').map(function (region) { return { abbrev: region }; });
        
    $scope.metros = ('1号线 2号线 3号线 4号线 5号线 11号线').split(' ').map(function (metro) { return { abbrev: metro }; });
    
    $scope.prices = ('0-30000 30000-50000 50000-70000 70000-100000 100000-1000000 自定义').split(' ').map(function (price) { return { abbrev: price }; });
    
    $scope.setPrice = function(){
        if($scope.loc_sel.userPrice == "自定义"){
            $scope.loc_sel.price_from_dis = false;
            $scope.loc_sel.price_to_dis = false;
        }
        else{
            $scope.loc_sel.price_from_dis = true;
            $scope.loc_sel.price_to_dis = true;
        }
    };
    
    $scope.reset = function(){
        $scope.loc_sel.region = false;
        $scope.loc_sel.metro = false;
        $scope.loc_sel.spms = false;
        $scope.loc_sel.school = false;
        $scope.loc_sel.price = false;
        
    };
    
    var checkParameters = function(){
        if($scope.loc_sel.region){
            if(!checkValue($scope.loc_sel.userRegion)){
                $scope.showSimpleToast("请选择区域！");
                return false;
            }
        }
        
        if($scope.loc_sel.metro){
            if(!checkValue($scope.loc_sel.userMetroDis)){
                $scope.showSimpleToast("请选择地铁站距离！");
                return false;
            }
        }
        
        if($scope.loc_sel.spms){
            if(!checkValue($scope.loc_sel.userSpmDis)){
                $scope.showSimpleToast("请选择超市距离！");
                return false;
            }
        }
        
        if($scope.loc_sel.school){
            if(!$scope.loc_sel.userXx && !$scope.loc_sel.userCz){
                $scope.showSimpleToast("请选择优质学区！");
                return false;
            }
        }
        
        if($scope.loc_sel.price){
            if(!checkValue($scope.loc_sel.userPrice)){
                $scope.showSimpleToast("请选择价格范围！");
                return false;
            }
        }
        return true;
    };
    
    var last = {
      bottom: true,
      top: false,
      left: true,
      right: false
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }
    
    $scope.showSimpleToast = function(str) {
        var pinTo = $scope.getToastPosition();

        $mdToast.show(
          $mdToast.simple()
            .textContent(str)
            .position(pinTo )
            .hideDelay(3000)
        );
      };
        
    var checkValue = function(v){
        if(v == "" || v == "请选择"){
            return false;
        }
        else{
            return true;
        }
    };
    
    $scope.robotSearch = function(){
        if(!checkParameters()){
            return;
        }
        
        var query = "";
       
        if($scope.loc_sel.region){
            if($scope.loc_sel.userRegion == "请选择"){
                query = "xzq=";
            }
            else{
                query = "xzq=" + $scope.loc_sel.userRegion;
            }            
        }
        else{
            query = "xzq=";
        }
        
        if($scope.loc_sel.metro){
            var dt_jl = 10;
            switch($scope.loc_sel.userMetroDis){
                case "步行3分钟内":dt_jl = 3;break;
                case "步行5分钟内":dt_jl = 5;break;
                case "步行10分钟内":dt_jl = 10;break;
            }
            if($scope.loc_sel.userMetro == "请选择"){
                query = query + "&dt_jl=" + dt_jl + "&dt_xl=";
            }
            else{
                query = query + "&dt_jl=" + dt_jl + "&dt_xl=" + $scope.loc_sel.userMetro;
            }            
        }
        else{
            query = query + "&dt_jl=&dt_xl=";
        }
        
        if($scope.loc_sel.spms){
            var cs_jl = 10;
            switch($scope.loc_sel.userSpmDis){
                case "步行3分钟内":cs_jl = 3;break;
                case "步行5分钟内":cs_jl = 5;break;
                case "步行10分钟内":cs_jl = 10;break;
            }
            if($scope.loc_sel.userSpm == "请选择"){
                query = query + "&cs_jl=" + cs_jl + "&cs_pp=";
            }
            else{
                query = query + "&cs_jl=" + cs_jl + "&cs_pp=" + $scope.loc_sel.userSpm;
            }            
        }
        else{
            query = query + "&cs_jl=&cs_pp=";
        }
        
        if($scope.loc_sel.school){
            if($scope.loc_sel.userXx){
                query = query + "&yzxx=1";
            }
            else{
                query = query + "&yzxx=";
            }
            if($scope.loc_sel.userCz){
                query = query + "&yzcz=1";
            }
            else{
                query = query + "&yzcz=";
            }
        }
        else{
            query = query + "&yzxx=&yzcz=";
        }
        
        if($scope.loc_sel.price){
            if($scope.loc_sel.userPrice == "自定义"){
                query = query + "&price=" + $scope.loc_sel.price_from + "-" + $scope.loc_sel.price_to;
            }
            else{
                query = query + "&price=" + $scope.loc_sel.userPrice;
            }
            
        }
        else{
            query = query + "&price=";
        }
        
        xqSearch.searchXqbyFacility(query)
        .then(
            function(response){
                regions = response.data;  
                refreshPages();
            }
        );
        $scope.resultShow = true;
    };

}]);

app.controller('contactController', ['$scope','userService','$mdDialog',function($scope,userService,$mdDialog) {
    $scope.feedback = {fullname:"", email:"",content:"" };
    
    $scope.sendFeedback = function(ev){
        
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('感谢您的建议！')
            .textContent('我们会尽快与您联系.')
            .ariaLabel('提交成功')
            .ok('知道了!')
            .targetEvent(ev)
        );
        
        userService.sendAdvise($scope.feedback.fullname,$scope.feedback.email,$scope.feedback.content);
        
    };
    
    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'login.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };
}]);