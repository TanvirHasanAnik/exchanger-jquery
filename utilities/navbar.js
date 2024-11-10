$(document).ready(function(){
    $("#logout").on("click", function (event){
      event.preventDefault();
      const apiUrl = "http://localhost:3000/user/logout";
      console.log('logout button clicked');
      axios.post(apiUrl).then(
        (response) => {
          if (response.status == 200) {
            window.location.replace("../user/login_page.html");
          }
        },
        (error) => {
          alert(error);
        }
      );
    });
    $("#navprofile").on("click", function () {
      window.location.href = "../user/profile_page.html";
    });
    axios
      .get("http://localhost:3000/user/get-profile", {
        withCredentials: true,
      })
      .then(function (response) {
        const userData = response.data;
        $("#navusername").empty();
        $("#navusername").append("  " + userData.username);
      });
  });