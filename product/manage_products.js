
$(document).ready(() => {
  var productListUrl = `http://localhost:3000/user-products/products-list`;
  var categoryListUrl = `http://localhost:3000/user-products/expected-category-list`;

  $("#category-list").on("click",".delete-category", function () {
    const expProductId = $(this).data("id"); // Get the category ID from the button's data attribute
    deleteCategory(expProductId);
  });

    axios
      .get("http://localhost:3000/user-products/get-category", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        response.data.forEach((category) => {
          console.log(category.categoryname);
          const categoryId = category.id;
          const categoryName = category.categoryname;
          $("#category-select").append(
            "<option value = '" +
            categoryId +
              "'>" +
              categoryName +
              "</option>"
          );
          $("#expected-category-select").append(
            "<option value = '" +
            categoryId +
              "'>" +
              categoryName +
              "</option>"
          );
        });
      });

      

    function loadProducts(){
      $("#product-list").html('');
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
            <div class="card shadow-sm" style="display: flex;flex-direction: column;overflow: hidden;">
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

      

    function loadCategories(){
      $("#category-list").empty();
      axios
        .get(categoryListUrl, {
          withCredentials: true,
        })
        .then(function (response) {
          const categories = response.data;
          console.log(categories);
          categories.forEach((category) => {
            const item =
              $(`<li class="shadow-sm list-group-item rounded border mb-3 p-3 d-flex justify-content-between align-items-center" style="background-color:white;width: 100%;">
                <span>${category.categoryname}</span>
                <button class="btn btn-danger btn-sm delete-category" id="delete-category" data-id="${category.id}">Delete</button>
                </li>`);
          $("#category-list").append(item);
          });
        });
    }

    function deleteCategory(expProductId) {
      const apiUrl = "http://localhost:3000/user-products/delete-expected-product";
      const data = {
        id: expProductId
      };
      axios.post(apiUrl, data, { withCredentials: true }).then(
        (response) => {
          if (response.status === 200) {
            loadCategories();
            alert(response.data.message);
          }
        },
        (error) => {
          console.log(error.response.data.message);
        }
      );
    }

    loadProducts();
    loadCategories();

    $("#new-product-form").on("submit", function (event) {
      event.preventDefault();
      const categoryid = $("#category-select").val();
      const title = $("#product-title").val();
      const description = $("#product-Description").val();
      const apiUrl = "http://localhost:3000/user-products/add-product";
      const data = {
        categoryid: categoryid,
        productTitle: title,
        productDescription: description,
      };
      axios.post(apiUrl, data, { withCredentials: true }).then(
        (response) => {
          if (response.status === 200) {
            $("#message").text(response.data.message);
            alert(response.data.message);
          }
        },
        (error) => {
          console.log(error.response.data.message);
        }
      );
    });

    $("#expected-product-form").on("submit", function (event) {
      event.preventDefault();
      const categoryid = $("#expected-category-select").val();
      const apiUrl = "http://localhost:3000/user-products/add-expected-product";
      const data = {
        categoryid: categoryid,
      };
      axios.post(apiUrl, data, { withCredentials: true }).then(
        (response) => {
          loadCategories();
          $("#exp-message").text(response.data.message);
          alert(response.data.message);
        },
        (error) => {
          console.log(error.response.data.message);
          $("#exp-message").text(error.response.data.message);
        }
      );
    });
});