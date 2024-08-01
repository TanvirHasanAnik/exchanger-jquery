
$(document).ready(function () {
    axios
      .get("http://localhost:3000/user/get-profile", {
        withCredentials: true,
      })
      .then(function (user) {
        const userData = user.data;
        console.log(userData);
        $("#username").append("Username: "+userData.username);
        $("#address").append("address: "+userData.address);
        $("#email").append("email: "+userData.email);
        $("#phone").append("phone: "+userData.phone);
      });
  });