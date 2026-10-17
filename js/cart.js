const CART_KEY = "shoePAPICart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function money(price) {
  return "₱" + price.toLocaleString("en-PH");
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = count;
    element.classList.toggle("hidden", count === 0);
  });
}

function renderCart() {
  const cart = getCart();
  const itemsElement = document.getElementById("cartItems");
  const empty = document.getElementById("emptyCart");
  const layout = document.getElementById("cartLayout");

  if (!itemsElement || !empty || !layout) return;

  empty.classList.toggle("hidden", cart.length > 0);
  layout.classList.toggle("hidden", cart.length === 0);

  itemsElement.innerHTML = cart.map((item, index) => `
    <div class="flex gap-4 p-4">
      <img src="${item.image}" alt="${item.name}" class="w-24 h-24 rounded-xl object-cover bg-slate-100">
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold">${item.name}</h3>
        <p class="text-sm text-slate-500">${item.category || ""}</p>
        <p class="text-sm text-slate-500">Size: ${Number(item.size) + 31}</p>
        <p class="mt-1 font-bold">${money(item.price)}</p>
        <div class="mt-3 flex items-center gap-3">
          <button data-minus="${index}" class="border rounded px-3 py-1">−</button>
          <span>${item.quantity}</span>
          <button data-plus="${index}" class="border rounded px-3 py-1">+</button>
          <button data-remove="${index}" class="text-sm text-red-500 ml-2">Remove</button>
        </div>
      </div>
    </div>
  `).join("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 1000 ? 0 : 100;

  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("shipping").textContent =
    shipping === 0 ? "Free" : money(shipping);
  document.getElementById("total").textContent = money(subtotal + shipping);
}

document.addEventListener("click", (event) => {
  const cart = getCart();
  const minus = event.target.closest("[data-minus]");
  const plus = event.target.closest("[data-plus]");
  const remove = event.target.closest("[data-remove]");

  if (minus) {
    const index = Number(minus.dataset.minus);
    cart[index].quantity--;

    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCart(cart);
  }

  if (plus) {
    cart[Number(plus.dataset.plus)].quantity++;
    saveCart(cart);
  }

  if (remove) {
    cart.splice(Number(remove.dataset.remove), 1);
    saveCart(cart);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();

  document.querySelector("#cartLayout aside button")?.addEventListener("click", () => {
    if (getCart().length === 0) {
      alert("Your cart is empty.");
    } else {
      alert("Checkout is not connected to a payment system yet.");
    }
  });
});