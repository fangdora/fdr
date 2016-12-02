var app = angular.module('myApp');

app.service('mapservice',function(){
    //始化地图函数：
    this.initMap =  function(mapDiv,xqdetail){
        createMap(mapDiv,xqdetail);//创建地图
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
    };

    //添加小区和配套点
    this.addFacility = function(xqdetail){
        //添加小区点
        var lng = parseFloat(xqdetail.lng);
        var lat = parseFloat(xqdetail.lat);
        var point = new BMap.Point(lng,lat);
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);

        //添加配套点
        if(xqdetail.dt_lng && xqdetail.dt_lat){
            lng = parseFloat(xqdetail.dt_lng);
            lat = parseFloat(xqdetail.dt_lat);
            point = new BMap.Point(lng,lat);
            marker = new BMap.Marker(point);
            map.addOverlay(marker);
        }

        if(xqdetail.cs_lng && xqdetail.cs_lat){
            lng = parseFloat(xqdetail.cs_lng);
            lat = parseFloat(xqdetail.cs_lat);
            point = new BMap.Point(lng,lat);
            marker = new BMap.Marker(point);
            map.addOverlay(marker);
        }                       

    };
    
    this.addCustomFacility = function(xqdetail){
        var lng = parseFloat(xqdetail.lng);
        var lat = parseFloat(xqdetail.lat);
        var point = new BMap.Point(lng,lat);
        var xqmc = xqdetail.xqmc;
        var xqOverlay = new ComplexCustomOverlay(new BMap.Point(lng,lat),xqmc,'xq')
        map.addOverlay(xqOverlay)
        
        //添加配套点
        if(xqdetail.dt_lng && xqdetail.dt_lat){
            lng = parseFloat(xqdetail.dt_lng);
            lat = parseFloat(xqdetail.dt_lat);
            point = new BMap.Point(lng,lat);
            var dtk = xqdetail.dtk;
            var dtOverlay = new ComplexCustomOverlay(new BMap.Point(lng,lat),dtk,'dt');
            map.addOverlay(dtOverlay);
        }

        if(xqdetail.cs_lng && xqdetail.cs_lat){
            lng = parseFloat(xqdetail.cs_lng);
            lat = parseFloat(xqdetail.cs_lat);
            point = new BMap.Point(lng,lat);
            var csmc = xqdetail.csmc;
            var csOverlay = new ComplexCustomOverlay(new BMap.Point(lng,lat),csmc,'cs');
            map.addOverlay(csOverlay);
        } 
    };

    //创建地图函数：
    function createMap(mapDiv,xqdetail){
        var map = new BMap.Map(mapDiv);//在百度地图容器中创建一个地图
        var lng = 114.066112;
        var lat = 22.548515;
        var level = 12;
        if (xqdetail.xqmc){  
            lng = parseFloat(xqdetail.lng);
            lat = parseFloat(xqdetail.lat);
            level = 16;
        }

        var point = new BMap.Point(lng,lat);//定义一个中心点坐标
        map.centerAndZoom(point,level);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }

    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }

    //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        //var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
        //map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);
    }    
          
    
    
    function ComplexCustomOverlay(point,text,type){
        this._point = point;
        this._text = text; 
        this._type = type;
    }   
    
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);      
        
      div.style.backgroundColor = "#FF0000";
      //div.style.border = "1px solid #BC3B3A";
      div.style.color = "white";
      div.style.height = "23px";
      div.style.padding = "2px";
      //div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      //div.style.MozUserSelect = "none";
      div.style.fontSize = "12px"
      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));      
      var that = this; 
      var arrow = this._arrow = document.createElement("div");
      arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "11px"; 
      arrow.style.height = "10px";     
      arrow.style.top = "22px";
      arrow.style.left = "10px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);  
     
      map.getPanes().labelPane.appendChild(div);
      
      return div;
    }    
      
    ComplexCustomOverlay.prototype.draw = function(){
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
        this._div.style.top = pixel.y - 30 + "px";
    }

});

