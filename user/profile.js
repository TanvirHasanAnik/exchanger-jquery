
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
        .then(function (response) {
          const userData = response.data;
          console.log(userId);
          console.log(userData);
          $("#username").append("  "+userData.username);
          $("#address").append("  "+userData.address);
          $("#email").append("  "+userData.email);
          $("#phone").append("  "+userData.phone);
        });
        
        axios
          .get(`http://localhost:3000/user-products/products-list?userid=${userId}`, {
            withCredentials: true,
          })
          .then(function (response) {
            const products = response.data;
            console.log(products);
            products.forEach((product) => {
              const item =
                $(`
            <li class = "mb-1" style = "width:100%">
              <div class="card" style="display: flex;flex-direction: column;overflow: hidden;">
                <div class="row g-0 ">
                  <div class="col-md-4">
                    <img style="height:100%; object-fit: cover;" src="../product-image.png" class="img-fluid rounded-start" alt="../image-placeholder.svg">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${product.productTitle}</h5>
                      <p class="card-text">${product.productDescription}</p>
                      <p class="card-text"><small style="color:green">${product.categoryname}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </li>`);
            $("#product-list").append(item);
            });
          });
    }
  });