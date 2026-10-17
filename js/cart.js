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
    <div class="flex items-start gap-4 p-4">
      <input data-select-item="${index}" type="checkbox" class="mt-1 accent-orange-500" aria-label="Select ${item.name}" ${item.selected !== false ? "checked" : ""}>
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

  const selectedItems = cart.filter((item) => item.selected !== false);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 1000 ? 0 : 100;
  const selectAll = document.getElementById("selectAllCartItems");
  const checkoutButton = document.getElementById("checkoutButton");

  selectAll.checked = selectedItems.length === cart.length;
  selectAll.indeterminate = selectedItems.length > 0 && selectedItems.length < cart.length;
  checkoutButton.textContent = `Checkout selected (${selectedItems.length})`;
  checkoutButton.disabled = selectedItems.length === 0;

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

document.addEventListener("change", (event) => {
  const selectItem = event.target.closest("[data-select-item]");

  if (!selectItem) return;

  const cart = getCart();
  cart[Number(selectItem.dataset.selectItem)].selected = selectItem.checked;
  saveCart(cart);
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();

  document.getElementById("selectAllCartItems")?.addEventListener("change", (event) => {
    const cart = getCart().map((item) => ({ ...item, selected: event.target.checked }));
    saveCart(cart);
  });

  document.getElementById("checkoutButton")?.addEventListener("click", () => {
    const selectedItems = getCart().filter((item) => item.selected !== false);

    if (selectedItems.length === 0) {
      alert("Select at least one item to checkout.");
    } else {
      alert("Checkout for selected items is not connected to a payment system yet.");
    }
  });
});