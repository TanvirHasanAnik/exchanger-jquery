
$(document).ready(function () {
    axios
      .get("http://localhost:3000/user/get-profile", {
        withCredentials: true,
      })
      .then(function (user) {
        const userData = user.data;
        console.log(userData);
        $("#username").append(userData.username);
        $("#address").append(userData.address);
        $("#email").append(userData.email);
        $("#phone").append(userData.phone);
      });
  });