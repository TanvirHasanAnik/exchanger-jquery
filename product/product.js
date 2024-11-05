
$(document).ready(function () {

  function getQueryParam(param){
    var urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
  }


  var productId = getQueryParam("productid");
  if(productId) {
    alert(productId);
    axios
      .get(`http://localhost:3000/user-products/get-product?productid=${productId}`, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        const product = response.data;
        alert(product.userid+product.categoryname+product.productTitle+product.productDescription);
      });
  }
      axios
        .get("http://localhost:3000/user-products/expected-product-list", {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          response.data.forEach((product) => {
            console.log(product.categoryname);
            $("#expected-productList").append(
              "<li>"+product.categoryname+"</li>"
            );
          });
        });
  });