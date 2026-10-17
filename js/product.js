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
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  alert("Product added to cart!");
}

document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: "p1", name: "Men's Sports Running Shoes", category: "Running", price: 300, image: "Components/Running Shoes.jpeg" },
    { id: "p2", name: "Men's Lightweight Running Shoes", category: "Running", price: 350, image: "Components/Running shoes 2.jpeg" },
    { id: "p3", name: "Men's Breathable Running Shoes", category: "Running", price: 330, image: "Components/Running Shoes 3.jpeg" },
    { id: "p4", name: "Ladies' Korean Flat Slide Sandals", category: "Sandals", price: 430, image: "Components/Sandals 2.jpeg" },
    { id: "p5", name: "Women's Casual Flat Sandals", category: "Sandals", price: 230, image: "Components/Sandals.jpeg" },
    { id: "p6", name: "Fashion Outdoor Sandals", category: "Sandals", price: 300, image: "Components/Sandals 3.jpeg" },
    { id: "p7", name: "Unisex Fashion Sneakers", category: "Sneakers", price: 400, image: "Components/Sneakers 1.jpeg" },
    { id: "p8", name: "On Running Cloud Tilt Sneakers", category: "Sneakers", price: 450, image: "Components/Sneakers 2.jpeg" },
    { id: "p9", name: "Purple and Gold Basketball Sneakers", category: "Sneakers", price: 480, image: "Components/Sneakers 3.jpeg" },
    { id: "p10", name: "Korean Fashion High-Cut Boots", category: "Boots", price: 480, image: "Components/Boots 1.jpeg" },
    { id: "p11", name: "Women's Martin Boots", category: "Boots", price: 550, image: "Components/Boots 2.jpeg" },
    { id: "p12", name: "Men's Leather Martin Boots", category: "Boots", price: 450, image: "Components/Screenshot_16-10-2026_135129_www.lazada.com.ph.jpeg" }
  ];

  const id = new URLSearchParams(location.search).get("id") || "p1";
  const product = products.find((item) => item.id === id);

  if (!product) {
    document.getElementById("productName").textContent = "Product not found";
    return;
  }

  const money = (price) => "₱" + price.toLocaleString("en-PH");

  document.title = product.name + " | ShoePAPI";
  document.getElementById("productImage").src = product.image;
  document.getElementById("productImage").alt = product.name;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productCategory").textContent = product.category;
  document.getElementById("productPrice").textContent = money(product.price);
  document.getElementById("productDesc").textContent =
    `Comfortable ${product.category.toLowerCase()} for everyday style.`;
  document.getElementById("crumbName").textContent = product.name;

  let size = "";
  let quantity = 1;

  document.querySelectorAll("[data-size]:not(:disabled)").forEach((button) => {
    button.addEventListener("click", () => {
      size = button.dataset.size;

      document.querySelectorAll("[data-size]").forEach((item) => {
        item.classList.remove("bg-orange-500", "text-white", "border-orange-500");
      });

      button.classList.add("bg-orange-500", "text-white", "border-orange-500");
      document.getElementById("sizeError").classList.add("hidden");
    });
  });

  document.getElementById("qtyMinus").addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    document.getElementById("qtyValue").textContent = quantity;
  });

  document.getElementById("qtyPlus").addEventListener("click", () => {
    quantity++;
    document.getElementById("qtyValue").textContent = quantity;
  });

  document.getElementById("addToCartBtn").addEventListener("click", () => {
    if (!size) {
      document.getElementById("sizeError").classList.remove("hidden");
      return;
    }

    addToCart({ ...product, size, quantity });
  });

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  document.getElementById("related").innerHTML = related.map((item) => `
    <a href="product.html?id=${item.id}" class="rounded-2xl bg-white p-3 shadow-sm hover:shadow-lg transition">
      <div class="aspect-square overflow-hidden rounded-xl bg-slate-100">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
      </div>
      <h3 class="mt-3 text-sm font-semibold">${item.name}</h3>
      <p class="mt-1 text-sm text-slate-500">${item.category}</p>
      <p class="mt-2 font-bold">${money(item.price)}</p>
    </a>
  `).join("");

  updateCartCount();

  
});