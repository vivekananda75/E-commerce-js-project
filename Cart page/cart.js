 let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const cartList = document.getElementById('cart-list');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const productCountEl = document.getElementById('product-count');
  const cartCountEl = document.getElementById('cart-count'); // Added
  const shipping = 30;

  function renderCart() {
    cartList.innerHTML = '';
    let subtotal = 0;
    let count = 0;

    if (cartItems.length === 0) {
      document.querySelector('.cart-wrapper').style.display = 'none';
      document.getElementById('empty-cart').style.display = 'block';
      cartCountEl.textContent = 0; // Show zero when empty
      return;
    } else {
      document.querySelector('.cart-wrapper').style.display = 'flex';
      document.getElementById('empty-cart').style.display = 'none';
    }

    cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
      count += item.quantity;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" />
        <div class="item-info">
          <strong>${item.title}</strong>
          <p>${item.quantity} x $${item.price.toFixed(2)}</p>
        </div>
        <div class="qty-controls">
          <button onclick="updateQty(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      `;
      cartList.appendChild(div);
    });

    subtotalEl.textContent = subtotal.toFixed(2);
    totalEl.textContent = (subtotal + shipping).toFixed(2);
    productCountEl.textContent = count;
    cartCountEl.textContent = count; // Update cart icon count
  }

  function updateQty(id, change) {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
      cartItems = cartItems.filter(i => i.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }

  renderCart();