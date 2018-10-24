/*
This is empty on purpose! Your code to build the resume will go here.
 */

var foo = function () {
    'use strict';
    // do something
}
var bio = {
    "name": "Kevin doe",
    "role": "web development",
    "biopic": "images/20171127223425.jpg",
    "welcomeMessage": "Welcome to my resume!",
    "skills": ["HTML", "CSS", "JavaScript", "JQuery"],
    "contacts": {
        "mobile": "13535380307",
        "email": "1260013987@qq.com",
        "twitter": "@杨阳洋",
        "github": "yqs19960816",
        "blog": "@17620913420",
        "location": "广东"
    }
};

var work = {
    "jobs": [{
        "employer": "准东钻井公司",
        "title": "钻井工程师",
        "dates": "2014.9-2016.2",
        "location": "新疆乌鲁木齐",
        "description": "负责提供油田单井或多井的建井工程设计及作业支持,包括准备建井提案、基础设计、建井作业程序 (钻井,完井,修井)、AFE’s 以及完井报告。对现场工程师培训生和初级工程师给予监督并指导。 必要情况下直接上井场参与关键的井上作业."
    }]
 
};

var education = {
    "schools": [{
        "name": "南充张澜职业技术学院",
        "degree": "大专",
        "dates": "2011.6-2014.9",
        "location": "四川省南充市高坪区",
        "majors": ["石油天然气开采"],
        "url": "http://sczl.com"
    },
    {
        "name": "Eckerd College",
        "location": "Fort Lauderdale,FL,US",
        "degree": "Masters",
        "majors": ["CompSci"],
        "dates": "2017",
        "url": "http://example.com"
    }
    ],
    "onlineCourses": [{
        "title": "JavaScript Syntax",
        "school": "Udacity",
        "dates": "2017",
        "url": "http://www.udacity.com/course/ud804"
    }]
};

var projects = {
    "projects": [{
        "title": "作品集网页",
        "dates": "2017",
        "description": "基于HTML和CSS制作的一个demo.",
        "images": ["images/20171128002504.png"]
    }]
};



//联系方式
bio.display = function () {
    var fromWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage); //欢迎语
    var fromRole = HTMLheaderRole.replace("%data%", bio.role); //求职意向
    var fromName = HTMLheaderName.replace("%data%", bio.name); //名称
    var fromBioPic = HTMLbioPic.replace("%data%", bio.biopic); //头像
    $("#header").prepend(fromName, fromRole, fromWelcomeMsg, fromBioPic);
    var fromMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var fromEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var fromTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var fromGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var fromBlog = HTMLblog.replace("%data%", bio.contacts.blog);
    var fromLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    $("#topContacts, #footerContacts").append(fromMobile, fromEmail, fromTwitter, fromGithub, fromBlog, fromLocation);
    //技能
    $("#header").append(HTMLskillsStart);
    bio.skills.forEach(function (value, index, element) {
        var fromSkill = HTMLskills.replace("%data%", value);
        $("#skills").append(fromSkill);
    });
};
bio.display();




//工作经历
work.display = function () {
    $("#workExperience").append(HTMLworkStart);
    work.jobs.forEach(function (value, index, element) {
        var fromEmployer = HTMLworkEmployer.replace("%data%", value.employer);
        var fromTitle = HTMLworkTitle.replace("%data%", value.title);
        var fromLocation = HTMLworkLocation.replace("%data%", value.location);
        var fromDates = HTMLworkDates.replace("%data%", value.dates);
        var fromDescription = HTMLworkDescription.replace("%data%", value.description);
        $(".work-entry").append(fromEmployer, fromTitle, fromLocation, fromDates, fromDescription);
    });
};
work.display();


//项目经验
projects.display = function () {
    projects.projects.forEach(function (v, i, e) {
        $("#projects:last").append(HTMLprojectStart);
        var fromTitle = HTMLprojectTitle.replace("%data%", v.title);
        var fromDates = HTMLprojectDates.replace("%data%", v.dates);
        var fromDescription = HTMLprojectDescription.replace("%data%", v.description);
        $(".project-entry:last").append(fromTitle, fromDates, fromDescription);
        if (e[i].images.length > 0) {
            projects.projects.forEach(function (v, i, e) {
                var fromImages = HTMLprojectImage.replace("%data%", v.images);
                $(".project-entry:last").append(fromImages);
            });
        }
    });

};
projects.display();
//教育经历
education.display = function () {
    $("#education").append(HTMLschoolStart);
    education.schools.forEach(function (v, i, e) {
        var fromName = HTMLschoolName.replace("%data%", e[i].name).replace("#", e[i].url);
        var fromDegree = HTMLschoolDegree.replace("%data%", e[i].degree);
        var fromDates = HTMLschoolDates.replace("%data%", e[i].dates);
        var fromLocation = HTMLschoolLocation.replace("%data%", e[i].location);
        var fromMajor = HTMLschoolMajor.replace("%data%", e[i].majors);
        $(".education-entry").append(fromName, fromDegree, fromDates, fromLocation, fromMajor);
    });
    education.onlineCourses.forEach(function (v, i, e) {
        var fromOnlineTitle = HTMLonlineTitle.replace("%data%", e[i].title).replace("#", e[i].url);
        var fromOnlineSchool = HTMLonlineSchool.replace("%data%", e[i].school);
        var fromOnlineDates = HTMLonlineDates.replace("%data%", e[i].dates);
        $(".education-entry").append(HTMLonlineClasses, fromOnlineTitle, fromOnlineSchool, fromOnlineDates);
    });
};
education.display();
//控制台输出工作地点
function locationizer(work_obj) { //定义一个函数   参数接受work的对象
    var locationArray = []; //初始化一个空数组
    for (job in work_obj.jobs) { //for in 遍历对象
        var newLocation = work_obj.jobs[job].location; //将遍历的对象工作地址存入一个新变量
        locationArray.push(newLocation); //添加入数组
    }
    return locationArray; //返回值 数组
}
console.log(locationizer(work)); //控制台运行 locationizer函数
//国际化名称
$("#main").append(internationalizeButton);

function inName(name) {
    name = name.trim().split(" "); //清除字符串前后空格，空格分割
    console.log(name);
    name[0] = name[0].slice(0, 1).toUpperCase() + name[0].slice(1).toLowerCase(); //名字首字母大写，后面全部小写
    name[1] = name[1].toUpperCase(); //姓全部大写
    return name[0] + " " + name[1]; //返回值
}
//添加地图
$("#mapDiv").append(googleMap);
