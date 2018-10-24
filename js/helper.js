/*
此文件包含所有能使得 resumeBuilder.js 能够运行的代码。 我们称之为帮助函数，因为它们支持您在本课程中的代码。
不要担心，您将在整个课程中了解此文件中发生的情况。
Cameron Pittman
*/
/*
这些是 HTML 字符串。 作为课程的一部分，
您将使用JavaScript函数替换您在其中看到的 ％data％ 占位符文本。
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span class="no">%data%</span>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text"></span><span class="zocial-call"></span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text"></span><span class="zocial-email"></span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text"></span><span class="zocial-twitter"><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text"></span><span class="zocial-github"><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text"></span><span class="zocial-weibo"></span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text"></span><span class="typicons-location"></span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span><hr style="filter: alpha(opacity=100,finishopacity=0,style=3)" width="95%" color=#987cb9 size=3">';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-column"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';
var HTMLschoolURL = '<br><a href="#">%data%</a>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';


/*
在JavaScript基础知识流程控制课程中找到的“国际化名称”挑战要求您创建一个将需要此帮助程序代码运行的函数。不要删除！它把你的代码连接到你要追加的按钮上。
*/
$(document).ready(function() {
    $('button').click(function() { // 点击触发事件
        var $name = $('#name');
        var iName = inName($name.text()) || function() {};
        $name.html(iName);
    });
});

/*
接下来的几行关于点击的内容是在JavaScript基础知识流程控制课程中的收集点击位置测验。
*/
var clickLocations = [];

function logClicks(x, y) {
    clickLocations.push( //同一点击位置会重复显示    可省略
        {
            x: x,
            y: y
        }
    );
    console.log('x location: ' + x + '; y location: ' + y); // 控制台输出
}
//收集点击位置
$(document).click(function(event) { //JQ事件对象
    var x = event.pageX; //获取X值
    var y = event.pageY; //获取y值
    logClicks(x, y); //传入logClicks函数
});




/*
这是有趣的部分。 这里是我们为网站生成自定义高德地图的地方。
有关详细信息，请参阅以下文档。
http://lbs.amap.com/
*/
var map; // 声明一个全局变量，存储地图对象

/*
从这里开始！ 在加载页面时会调用initializeMap（）
*/
function initializeMap() {
    // 创建地图对象
    map = new AMap.Map('map', {
        resizeEnable: true,
        center: [105.30, 36.030],
        zoom: 4
    });

    map.plugin(["AMap.ToolBar"], function() {
        // 添加 工具条
        map.addControl(new AMap.ToolBar());
    });

    var locations = locationFinder();
    locations.forEach(function(place) {
        searchLocation(place);
    });

    map.setFitView();
}

//这个函数会读取，你在 resumeBuilder.js 所写下的全部有关地址的数据
function locationFinder() {

    // 初始化一个空的数组，用来存储地点
    var locations = [];

    //将 bio 的 contacts 数据里的地址添加到 locations 数组里
    locations.push(bio.contacts.location);


    //迭代 education 的 schools 数据里的地址，并将地址添加到 locations 数组里
    education.schools.forEach(function(school) {
        locations.push(school.location);
    });


    // 迭代 work 的 jobs 数据里的地址，并将地址添加到 locations 数组里
    work.jobs.forEach(function(job) {
        locations.push(job.location);
    });

    return locations;
}


//根据地址的名字，将标记添加上地图上
function searchLocation(name) {
    AMap.service('AMap.PlaceSearch', function() { //回调函数
        //实例化PlaceSearch
        placeSearch = new AMap.PlaceSearch();

        //使用placeSearch对象调用关键字搜索的功能
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 1,
            pageIndex: 1,
            city: "010" //城市，默认：全国
        });

        //关键字查询地点坐标
        placeSearch.search(name, function(status, result) {
            //使用 result 在地图上创建标记
            var position = extraPositionFromJson(result);
            placeMarker(position.lng, position.lat, map);
        });
    });
}

//解析 JSON 并返回地图的坐标
function extraPositionFromJson(json) {
    var poiList = json.poiList;
    var pois = poiList.pois;
    var location = pois[0].location;

    return location;
}


//在相应的坐标中添加标记
function placeMarker(lng, lat, map) {
    marker = new AMap.Marker({
        position: [lng, lat],
        map: map
    });
}

// 在加载页面时调用 initializeMap（）函数
window.addEventListener('load', initializeMap);

// 当页面的大小改变时，调整地图的缩放
window.addEventListener('resize', function(e) {
    map.setFitView();
});