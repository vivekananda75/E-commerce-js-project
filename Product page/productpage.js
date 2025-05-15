 let productContainer = document.getElementById("product-container");

        // Function to update the cart count in the navbar
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            const cartCountElement = document.getElementById("cart-count");
            if (cartCountElement) {
                cartCountElement.textContent = count;
            }
        }

        async function getData() {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();

            data.forEach((ele) => {
                let itemContainer = document.createElement("div");
                itemContainer.classList.add("product-item");
                itemContainer.setAttribute("data-category", ele.category); // Set the product category

                let createImgEle = document.createElement("img");
                createImgEle.setAttribute("src", ele.image);
                createImgEle.setAttribute("class", "myImages");

                let createTitleEle = document.createElement("h3");
                createTitleEle.textContent = ele.title.substring(0, 10) + "...";

                let createDescEle = document.createElement("p");
                createDescEle.textContent = ele.description.substring(0, 95) + "...";

                let createPriceEle = document.createElement("span");
                createPriceEle.textContent = "$" + ele.price;
                createPriceEle.classList.add("price");

                // Buttons
                let buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");

                let detailsBtn = document.createElement("button");
                detailsBtn.textContent = "Details";
                detailsBtn.classList.add("details-btn");

                let cartBtn = document.createElement("button");
                cartBtn.textContent = "Add to Cart";
                cartBtn.classList.add("cart-btn");

                // Added to Cart functionality
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

                // Appended all elements
                itemContainer.appendChild(createImgEle);
                itemContainer.appendChild(createTitleEle);
                itemContainer.appendChild(createDescEle);
                itemContainer.appendChild(createPriceEle);
                itemContainer.appendChild(buttonContainer);

                productContainer.appendChild(itemContainer);
            });
        }

        getData();
        updateCartCount();

        // Filtered functionality (updated)
        document.querySelectorAll(".productsBtn").forEach(button => {
            button.addEventListener("click", () => {
                const filter = button.getAttribute("data-filter"); // Get the filter category
                const allProducts = document.querySelectorAll(".product-item"); // Get all products

                allProducts.forEach(product => {
                    const category = product.getAttribute("data-category"); // Get the product's category

                    // Show or hide the product based on the filter
                    if (filter === "all" || category === filter) {
                        product.style.display = "block";
                    } else {
                        product.style.display = "none";
                    }
                });
            });
        });