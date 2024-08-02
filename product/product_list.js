
$(document).ready(function () {
    axios
      .get("http://localhost:3000/user-products/products-list", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        response.data.forEach((product) => {
          console.log(product.categoryname);
          $("#productList").append(
            "<li>title:" +
              product.productTitle +
              " <br>category:" +
              product.categoryname +
              " <br>Description:" +
              product.productDescription +
              "</li>"
          );
        });
      });
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