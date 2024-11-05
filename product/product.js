
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
        const category = product.categoryname;
        const title = product.productTitle;
        const description = product.productDescription;
        //alert(product.userid+product.categoryname+product.productTitle+product.productDescription);
        
        $("#category").append(category);
        $("#product-title").append(title);
        $("#product-description").append(description);
      });
  } 
  function loadUser(){

  }
});