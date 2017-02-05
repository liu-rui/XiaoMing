user = function () {
    var isLogined = ko.observable(false);
    var name = ko.observable();

    function login() {
        var dialog = loginModule();
        ko.applyBindings(dialog, document.getElementById("loginDialog"));
        dialog.show();
    }

    function register() {
        alert("register");

    }

    function loginout() {
        alert("loginout");
        
    }

    return {
        isLogined: isLogined,
        name: name,
        login: login,
        register: register,
        loginout: loginout,
    };
}();


loginModule = function () {
    var userName = ko.observable();
    var password = ko.observable();

    function request() {
        if (!userName()) {
            alert("请输入用户名")
            return;
        }

        if (!password()) {
            alert("请输入密码")
            return;
        }
        webApiFactory.login(userName, password, function (code, data) {
            if (code != 200) {
                alert("登录失败");
                password("");
                return;
            }
            user.name(data.name);
            user.isLogined(true);
            $('#loginDialog').modal('hide');
        });
    }

    function show() {
        $('#loginDialog').modal('show');
    }

    return {
        userName: userName,
        password: password,
        request: request,
        show: show
    };
};


device = function () {
    var devices = ko.observableArray([]);

    devices.push({ "id": '1', "type": "摄像头", "createTime": "2017/1/1" });
    devices.push({ "id": '2', "type": "传感器", "createTime": "2017/1/2" });

    function show() {
        contentControl.show("device", device);
    }

    function add() {
        devices.push({ "id": '3', "type": "机器人", "createTime": "2017/1/3" });
    }

    return {
        devices: devices,
        show: show,
        add: add
    };
}();


contentControl = function () {
    var views = ["device"];
    var currentView = ko.observable();

    function show(view, data) {
        if (views.indexOf(view) == -1) {
            console.error("无效的视图");
            return;
        }
        currentView(view);
        ko.applyBindings({
            type: view,
            data: data
        }, document.getElementById("content"));
    }

    return {
        currentView: currentView,
        show: show
    };
}();

app = function () {
    return {

    };
}();


webApi = function () {
    var href = window.location.href;
    var absolutUrl = href.substring(0, href.lastIndexOf("/"));
    var token = null;


    function error(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status >= 500)
            alert("服务器异常");
    }

    function getUrl(relativeUrl) {
        return absolutUrl + relativeUrl;
    }

    function get(path, callback) {
        $.ajax({
            type: "get",
            url: getUrl(path),
            data: {},
            cache: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (!callback) return;
                callback(data);
            },
            error: error,
        });
    }

    function post(path, data, callback) {
        $.ajax({
            type: "Post",
            url: getUrl(path),
            data: data,
            cache: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (!callback) return;
                callback(data);
            },
            error: error,
        });
    }

    return {
        login: function (name, pwd, callback) {
            post("/login", JSON.stringify({ name: name, pwd: pwd }), callback);
        },
    };
}();


webApiMock = function () {
    return {
        login: function (name, pwd, callback) {
            callback(200, { "name": "renxing", "token": '1234556' });
        },
    }
}();


webApiFactory = webApiMock;


$(document).ready(function () {
    ko.applyBindings(app,
        document.getElementById("nav"));
});
