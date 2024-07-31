$(document).ready(function () {
    $("#form1").on("submit", function (event) {
      event.preventDefault();
      const username = $("#username").val();
      const password = $("#password").val();
      const address = $("#address").val();
      const email = $("#email").val();
      const phone = $("#phone").val();
      if (username === "") {
        $("#username-error").text("*Enter username");
      }
      if (password === "") {
        $("#password-error").text("*Enter password");
      }
      if (address === "") {
        $("#address-error").text("*Enter address");
      }
      else{
        var isEmailValid = true;
        var isPhoneValid = true;
        if (email != "") {
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          isEmailValid = emailPattern.test(email);
          if(isEmailValid == false){
            alert('invalid email');
          }
        } 
        if (phone != "") {
          const phonePattern = /(01)[3-9]{1}\d{8}/;
          isPhoneValid = phonePattern.test(phone);
          if(isPhoneValid == false){
            alert('invalid phone');
          }
        } 
        if(isEmailValid && isPhoneValid){
          const apiUrl = "http://localhost:3000/user/register";
          const data = {
            username: username,
            password: password,
            address: address,
            email: email,
            phone: phone
          };
          axios.post(apiUrl, data).then(
            (response) => {
              $("#message").text(response.data.message);
            },
            (error) => {
              $("#message").text(error.response.data.message);
            }
          );
        } else{
          alert('error');
        }
      }
    });
  });