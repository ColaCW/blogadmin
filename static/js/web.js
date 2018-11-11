function getHost(){
  var s=location.href;
  var i=s.indexOf('/',10);
  if(i!=-1){
    s=s.substring(0,i);
  }
  return s;
}
var Web = {

  // host: getHost(),
  host:"http://127.0.0.1",

  testF: function () {
    alert("test");
  },
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
      crossDomain: true,
      xhrFields: {withCredentials: true},
      success: success
    });
  },

  go: function (url) {
    location.href = url;
  },
};



