const productContainer = document.getElementById("product-container");

    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      document.getElementById("cart-count").textContent = count;
    }

    async function getData() {
      const res = await fetch('https://fakestoreapi.com/products ');
      const data = await res.json();

      data.forEach(ele => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("product-item");
        itemContainer.setAttribute("data-category", ele.category);

        const createImgEle = document.createElement("img");
        createImgEle.setAttribute("src", ele.image);
        createImgEle.setAttribute("class", "myImages");

        const createTitleEle = document.createElement("h3");
        createTitleEle.textContent = ele.title.substring(0, 10) + "...";

        const createDescEle = document.createElement("p");
        createDescEle.textContent = ele.description.substring(0, 95) + "...";

        const createPriceEle = document.createElement("span");
        createPriceEle.textContent = "$" + ele.price;
        createPriceEle.classList.add("price");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const detailsBtn = document.createElement("button");
        detailsBtn.textContent = "Details";
        detailsBtn.classList.add("details-btn");

        const cartBtn = document.createElement("button");
        cartBtn.textContent = "Add to Cart";
        cartBtn.classList.add("cart-btn");

        cartBtn.addEventListener("click", () => {
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          const existing = cart.find(item => item.id === ele.id);
          if (!existing) {
            cart.push({
              id: ele.id,
              title: ele.title,
              price: ele.price,
              image: ele.image,
              quantity: 1
            });
          } else {
            existing.quantity += 1;
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount();
          alert("Product added to cart!");
        });

        buttonContainer.appendChild(detailsBtn);
        buttonContainer.appendChild(cartBtn);

        itemContainer.appendChild(createImgEle);
        itemContainer.appendChild(createTitleEle);
        itemContainer.appendChild(createDescEle);
        itemContainer.appendChild(createPriceEle);
        itemContainer.appendChild(buttonContainer);

        productContainer.appendChild(itemContainer);
      });
    }

    // Filter functionality
    document.querySelectorAll(".productsBtn").forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        const allProducts = document.querySelectorAll(".product-item");

        allProducts.forEach(product => {
          const category = product.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            product.style.display = "block";
          } else {
            product.style.display = "none";
          }
        });
      });
    });

    getData();
    updateCartCount();