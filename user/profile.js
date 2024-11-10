$(document).ready(function () {
    var userInfoUrl = `http://localhost:3000/user/get-profile`;
    var reviewCountUrl = `http://localhost:3000/review/get-review-count`;
    var productListUrl = `http://localhost:3000/user-products/products-list`;
    var reviewListUrl = `http://localhost:3000/review/get-review`;

    function getQueryParam(param){
      var urlParam = new URLSearchParams(window.location.search);
      return urlParam.get(param);
    }


    var userId = getQueryParam("userId");

    if(userId){
      userInfoUrl = `http://localhost:3000/user/get-profile?userid=${userId}`;
      reviewCountUrl = `http://localhost:3000/review/get-review-count?userid=${userId}`;
      productListUrl = `http://localhost:3000/user-products/products-list?userid=${userId}`;
      reviewListUrl = `http://localhost:3000/review/get-review?userid=${userId}`;
    }

      //user info
      function loadUserInfo(){
        axios
          .get(userInfoUrl, {
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
      }

        //Review counts
        function reviewCounts(){
          $("#positive-count").html('');
          $("#negative-count").html('');
          $("#positive-percentage").html('');
          axios
            .get(reviewCountUrl, {
              withCredentials: true,
            })
            .then(function (response) {
              const counts = response.data;
              
              const positiveCount = counts.positive != null ? counts.positive : 0;
              const negativeCount = counts.negative != null ? counts.negative : 0;
              const positivePercentage = counts.total > 0 ? (positiveCount / counts.total) * 100 : 0;
              
              console.log(counts);
  
              $("#positive-count").append(`+ Reviews <i class="bi bi-hand-thumbs-up-fill"></i> `+positiveCount);
              $("#negative-count").append(`- Reviews <i class="bi bi-hand-thumbs-down-fill"></i> `+negativeCount);
              $("#positive-percentage").append("Positive Review Percentage: "+positivePercentage.toFixed(2));
  
              const progressBar = document.getElementById('percentage-bar');
              progressBar.style.width = positivePercentage + '%';
              progressBar.setAttribute('aria-valuenow', positivePercentage);
            });
        }
        
        //user product list

        function loadProducts(){
          axios
            .get(productListUrl, {
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
          
        //user profile review list
        function loadReviews(){
          $("#review-list").html('');

          axios
          .get(reviewListUrl, {
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
                    <img src="../user-image.jpg" class="rounded-circle me-2" alt="User Profile" style="width: 40px; height: 40px;">
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
          loadUserInfo();
          reviewCounts();
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
                reviewCounts();
                loadReviews();
              },
              (error) => {
                alert(error.response ? error.response.data.message : "An error occurred");
              }
            );
          });
  });