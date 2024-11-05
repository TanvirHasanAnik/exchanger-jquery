
$(document).ready(function () {

  function getQueryParam(param){
    var urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
  }


  var productId = getQueryParam("productid");
  if(productId) {
    //alert(productId);
    axios
      .get(`http://localhost:3000/user-products/get-product?productid=${productId}`, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        const product = response.data;
        const userId = product.userid;
        const category = product.categoryname;
        const title = product.productTitle;
        const description = product.productDescription;
        //alert(product.userid+product.categoryname+product.productTitle+product.productDescription);
        
        $("#category").append(category);
        $("#product-title").append(title);
        $("#product-description").append(description);

        loadUserInfo(userId);

        $("#user").click(function () {
          window.location.href = "../user/profile_page.html?userId=" + userId;
        })
      });
  } 
  function loadUserInfo(userId){
    
    userInfoUrl = `http://localhost:3000/user/get-profile?userid=${userId}`;
    axios
      .get(userInfoUrl, {
        withCredentials: true,
      })
      .then(function (response) {
        const userData = response.data;
        console.log(userId);
        console.log(userData);
        $("#user-name").append("  "+userData.username);
        $("#address").append("  "+userData.address);
        $("#email").append("  "+userData.email);
        $("#phone").append("  "+userData.phone);
      });
  }

});