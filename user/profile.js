
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
        
        //product list

        function loadProducts(){
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
          
          //review list
          function loadReviews(){
            $("#review-list").html('');

            axios
            .get(`http://localhost:3000/review/get-review?userid=${userId}`, {
              withCredentials: true,
            })
            .then(function (response) {
              const reviews = response.data;
              console.log(reviews);
              reviews.forEach((review) => {
                const item =
                  $(`
              <li class = "mb-1" style = "width:100%">
                <div class="container">
                  <div class="card p-3">
                    <!-- User Information Row -->
                    <div class="d-flex align-items-center mb-2">
                      <!-- User Profile Picture -->
                      <img src="../user-image3.jpg" class="rounded-circle me-2" alt="User Profile" style="width: 40px; height: 40px;">
                      <!-- Username -->
                      <h5 class="mb-0">${review.username}</h5>
                    </div>
                    <!-- Review Content -->
                    <p class="card-text">${review.content}</p>
                    <p class="card-text"><small class="text-muted">Posted on: January 1, 2024</small></p>
                  </div>
                </div>
              </li>`);
              $("#review-list").append(item);
              });
            });
          }
          
          loadProducts();
          loadReviews();

          //adding/posting review

          $("#review-form").on("submit", function (event) {
            event.preventDefault();
            const apiUrl = "http://localhost:3000/review/add-review";
            const data = {
              userid: userId,
              content: $("#reviewText").val()
            };
            axios.post(apiUrl, data, { withCredentials: true }).then(
              (response) => {
                alert(response.data.message);
                loadReviews();
              },
              (error) => {
                alert(error.response ? error.response.data.message : "An error occurred");
              }
            );
          });
    }
  });