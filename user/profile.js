
$(document).ready(function () {
    function getQueryParam(param){
      var urlParam = new URLSearchParams(window.location.search);
      return urlParam.get(param);
    }

    var userId = getQueryParam("userId");
    if(userId) {
      axios
        .get(`http://localhost:3000/user/get-profile?userid=${userId}`, {
          withCredentials: true,
        })
        .then(function (user) {
          const userData = user.data;
          console.log(userId);
          console.log(userData);
          $("#username").append("  "+userData.username);
          $("#address").append("  "+userData.address);
          $("#email").append("  "+userData.email);
          $("#phone").append("  "+userData.phone);
        });
    }
  });