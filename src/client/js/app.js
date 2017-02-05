user = function () {
    var isLogined = true;
    var userInfo = {
        id: '12',
        name: 'renxing'
    };

    function login() {
        alert("login");
    }

    function register() {
        alert("register");

    }

    function loginout() {
        alert("loginout");
    }

    return {
        isLogined: isLogined,
        userInfo: userInfo,
        login: login,
        register: register,
        loginout: loginout,
    };
} ();

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
} ();


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
} ();

app = function () {
    return {

    };
} ();


$(document).ready(function () {
    ko.applyBindings(app,
        document.getElementById("nav"));
});
