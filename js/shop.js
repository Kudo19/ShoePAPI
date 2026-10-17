const CART_KEY = "shoePAPICart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = count;
    element.classList.toggle("hidden", count === 0);
  });
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(
    (item) => item.id === product.id && item.size === product.size
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  alert("Product added to cart!");
}

document.addEventListener("DOMContentLoaded", () => {
  const products = [...document.querySelectorAll("[data-product]")];
  const filters = [...document.querySelectorAll(".category-filter")];
  const sortSelect = document.querySelector("section.lg\\:col-span-3 select");
  const count = document.getElementById("product-count");
  const grid = products[0]?.parentElement;

  const category = new URLSearchParams(location.search).get("category");

  if (category) {
    filters.forEach((filter) => {
      filter.checked = filter.value === category;
    });
  }

  function updateProducts() {
    const selected = filters
      .filter((filter) => filter.checked)
      .map((filter) => filter.value);

    let visible = products.filter((product) =>
      selected.includes(product.dataset.category)
    );

    const sort = sortSelect?.selectedIndex ?? 0;

    if (sort === 1) {
      visible.sort((a, b) => +a.dataset.price - +b.dataset.price);
    } else if (sort === 2) {
      visible.sort((a, b) => +b.dataset.price - +a.dataset.price);
    } else if (sort === 3) {
      visible.sort((a, b) => products.indexOf(b) - products.indexOf(a));
    } else {
      visible.sort((a, b) => products.indexOf(a) - products.indexOf(b));
    }

    products.forEach((product) => {
      product.classList.toggle("hidden", !visible.includes(product));
    });

    visible.forEach((product) => grid.appendChild(product));

    if (count) {
      count.textContent = `Showing ${visible.length} products`;
    }
  }

  filters.forEach((filter) => filter.addEventListener("change", updateProducts));
  sortSelect?.addEventListener("change", updateProducts);

  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-product]");

      addToCart({
        id: card.dataset.id,
        name: card.querySelector("h3").textContent.trim(),
        category: card.dataset.category,
        price: Number(card.dataset.price),
        image: card.querySelector("img").getAttribute("src"),
        size: "Not selected",
        quantity: 1
      });
    });
  });

  updateProducts();
  updateCartCount();
});