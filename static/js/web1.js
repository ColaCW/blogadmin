function getHost() {
  var s = location.href;
  var i = s.indexOf('/', 10);
  if (i != -1) {
    s = s.substring(0, i);
  }
  return s;
}

var Web = {

  // host: getHost(),
  host: "http://127.0.0.1",

  get: function (url, data, success) {
    var data2 = "";
    if (data) {
      for (var key in data) {
        data2 += "&" + key + "=" + encodeURIComponent(data[key]);
      }
    }
    jQuery.ajax({
      type: 'GET',
      contentType: "application/json; charset=utf-8",
      url: url,
      data: data2,
      dataType: "json",
      success: success
    });
  },

  post: function (url, data, success) {
    jQuery.ajax({
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      url: url,
      data: JSON.stringify(data),
      dataType: "json",
      success: success
    });
  },

  go: function (url) {
    location.href = url;
  },

  setValue:function(key, value){
    store.set(key, value);
  },

  getValue:function (key) {
    return store.get(key);
  },

  login: function (phone, password, callback) {
    var data = {
      phone: phone,
      password: password
    }
    Web.post(Web.host + "/api/web/login.do", data, function (res) {
      callback(res);
      if(res.status){
        Web.saveUser(res.data);
      }
    })
  },

  logout: function (goPage) {
    if(typeof(goPage)=='undefined' || !goPage){
      goPage = Web.host;
    }
    var user=Web.getUser();
    if(user && user.token){
      Web.post(Web.host + "/api/web/logout.do", {token:user.token}, function (res) {
        if(res.status){
          Web.saveUser(null);
          Web.go(goPage);
        }
      });
    }else{
      Web.saveUser(null);
      Web.go(goPage)
    }
  },

  getParam: function (url, name, defaultValue) {
    if (typeof (url) == 'undefined' || !url) {
      url = window.location.search.substr(1);
    }
    var i = url.indexOf('#');
    if (i != -1) {
      url = url.substring(0, i);
    }
    i = url.indexOf('?');
    if (i != -1) {
      url = url.substring(i + 1);
    }
    url = '&' + url + '&';
    var key = '&' + name + '=';
    var i = url.indexOf(key);
    if (i != -1) {
      var j = url.indexOf('&', i + key.length);
      if (j != -1) {
        return url.substring(i + key.length, j);
      }
    }
    return defaultValue;
  },

  getUser: function () {
    var user = this.getValue("user");
    return user;
  },

  saveUser: function (user) {
    this.setValue("user", user);
  },

  getToken:function(){
    var user = this.getValue("user");
    return user && user.token;
  },

  getSrc:function(s){
    if(s && s.indexOf("http")==-1){
      s=this.host+"/"+s;
    }else{
      s='/f/_.gif';
    }
    return s;
  },

  removeObj:function(obj,list){
    var index = -1;
    if(list && list.length != 0){
      for(var i = 0;i<list.length;i++){
        if(Web.equalObj(obj,list[i])){
          index = i;
          break;
        }
      }
      if(index != -1){
        list.splice(index,1);
      }
      return list;
    }
    return null;
  },

  equalObj:function(obj1,obj2){
    if(obj1 && obj2){
      if(JSON.stringify(obj1) == JSON.stringify(obj2)){
        return true;
      }
    }
    return false;
  },

  showMessage: function(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "width:15%; min-width:9.4rem; background:#000; opacity:0.5; height:2.5rem; color:#fff; line-height:2.5rem; text-align:center; border-radius:5px; position:fixed; top:40%; left:40%; z-index:999999; font-weight:bold;";
    document.body.appendChild(m);
    setTimeout(function () {
      var d = 0.5;
      m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
      m.style.opacity = '0';
      // setTimeout(function () {
      //   document.body.removeChild(m)
      // }, d * 1000);
    }, duration);
  },
};

