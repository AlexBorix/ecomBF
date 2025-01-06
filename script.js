// Variables globales
const cart = [];
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const openCartButton = document.getElementById('open-cart');
const closeCartButton = document.getElementById('close-cart');
const checkoutButton = document.getElementById('checkout');

// Ajouter un produit au panier
function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
  openCart();
}

// Augmenter la quantité d'un produit
function increaseQuantity(productId) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity++;
    updateCart();
  }
}

// Diminuer la quantité d'un produit
function decreaseQuantity(productId) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity--;
    if (product.quantity === 0) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }
}

// Supprimer un produit du panier
function removeFromCart(productId) {
  const productIndex = cart.findIndex(item => item.id === productId);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
  }
  updateCart();
}

// Mettre à jour le panier
function updateCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;
  
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
  
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="https://via.placeholder.com/50" alt="${item.name}">
        <div class="product-details">
          <h3>${item.name}</h3>
          <p>${item.price}FCFA/1 produit</p>
        </div>
        <div class="quantity-controls">
          <button class="decrease-btn" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-btn" data-id="${item.id}">+</button>
        </div>
      `;
      cartItems.appendChild(listItem);
    });
  
    totalPriceElement.textContent = totalPrice;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    // Gestion des boutons d'augmentation et de diminution
    document.querySelectorAll('.increase-btn').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        increaseQuantity(productId);
      });
    });
  
    document.querySelectorAll('.decrease-btn').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        decreaseQuantity(productId);
      });
    });
  }
  

// Ouvrir le panier
function openCart() {
  cartDrawer.classList.add('open');
}

// Fermer le panier
function closeCart() {
  cartDrawer.classList.remove('open');
}

// Rediriger vers WhatsApp
checkoutButton.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Votre panier est vide.');
    return;
  }

  const orderDetails = cart
    .map(item => `${item.name} x ${item.quantity} - ${item.price * item.quantity}€`)
    .join('\n');

  const total = totalPriceElement.textContent;
  const message = `Bonjour, je souhaite commander les produits suivants :\n${orderDetails}\n\nTotal : ${total}€`;
  const whatsappUrl = `https://wa.me/+22672827280?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});

// Gestion des événements
openCartButton.addEventListener('click', openCart);
closeCartButton.addEventListener('click', closeCart);

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productElement = button.parentElement;
    const product = {
      id: productElement.getAttribute('data-id'),
      name: productElement.getAttribute('data-name'),
      price: parseFloat(productElement.getAttribute('data-price')),
    };
    addToCart(product);
  });
});

// Sélection du menu burger et des liens
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.querySelector('.nav-links');

// Gestion du clic sur le menu burger
burgerMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active'); // Ajoute ou retire la classe "active"
});
