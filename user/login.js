$(document).ready(function () {
    $("#form1").on("submit", function (event) {
      event.preventDefault();
      const username = $("#username").val();
      const password = $("#password").val();
      if (username === "") {
        $("#username-error").text("*Enter username");
      }
      if (password === "") {
        $("#password-error").text("*Enter password");
      } else {
        const apiUrl = "http://localhost:3000/user/login";
        const data = {
          username: username,
          password: password,
        };
        axios.post(apiUrl, data, { withCredentials: true }).then(
          (response) => {
            $("#message").text(response.data.message);
            if (response.status == 200) {
              window.location.href = "../home/home_page.html";
            }
          },
          (error) => {
            $("#message").text(error.response.data.message);
          }
        );
      }
    });
  });