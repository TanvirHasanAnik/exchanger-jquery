
$(document).ready(() => {
    axios
      .get("http://localhost:3000/user-products/get-category", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        response.data.forEach((category) => {
          console.log(category.categoryname);
          $("#category-select").append(
            "<option value = '" +
              category.id +
              "'>" +
              category.categoryname +
              "</option>"
          );
        });
      });

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
          if (response.status == 200) {
            alert(response.data.message);
          }
        },
        (error) => {
          console.log(error.response.data.message);
        }
      );
    });
  });