
const products = [
  {
    id: "p1",
    name: "Men's Sports Running Shoes",
    category: "Running",
    price: 300,
    image: "Components/Running Shoes.jpeg"
  },
  {
    id: "p2",
    name: "Men's Lightweight Running Shoes",
    category: "Running",
    price: 350,
    image: "Components/Running shoes 2.jpeg"
  },
  {
    id: "p3",
    name: "Men's Breathable Running Shoes",
    category: "Running",
    price: 330,
    image: "Components/Running Shoes 3.jpeg"
  },
  {
    id: "p4",
    name: "Ladies' Korean Flat Slide Sandals",
    category: "Sandals",
    price: 430,
    image: "Components/Sandals 2.jpeg"
  },
  {
    id: "p5",
    name: "Women's Casual Flat Sandals",
    category: "Sandals",
    price: 230,
    image: "Components/Sandals.jpeg"
  },
  {
    id: "p6",
    name: "Fashion Outdoor Sandals",
    category: "Sandals",
    price: 300,
    image: "Components/Sandals 3.jpeg"
  },
  {
    id: "p7",
    name: "Unisex Fashion Sneakers",
    category: "Sneakers",
    price: 400,
    image: "Components/Sneakers 1.jpeg"
  },
  {
    id: "p8",
    name: "On Running Cloud Tilt Sneakers",
    category: "Sneakers",
    price: 450,
    image: "Components/Sneakers 2.jpeg"
  },
  {
    id: "p9",
    name: "Purple and Gold Basketball Sneakers",
    category: "Sneakers",
    price: 480,
    image: "Components/Sneakers 3.jpeg"
  },
  {
    id: "p10",
    name: "Korean Fashion High-Cut Boots",
    category: "Boots",
    price: 480,
    image: "Components/Boots 1.jpeg"
  },
  {
    id: "p11",
    name: "Women's Martin Boots",
    category: "Boots",
    price: 550,
    image: "Components/Boots 2.jpeg"
  },
  {
    id: "p12",
    name: "Men's Leather Martin Boots",
    category: "Boots",
    price: 450,
    image: "Components/Screenshot_16-10-2026_135129_www.lazada.com.ph.jpeg"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const productSearch = document.getElementById("productSearch");
  const searchSuggestions = document.getElementById("searchSuggestions");

  if (!searchForm || !productSearch || !searchSuggestions) {
    console.error(
      "Search elements not found. Check searchForm, productSearch, and searchSuggestions IDs."
    );
    return;
  }

  const money = (price) =>
    "₱" + price.toLocaleString("en-PH");

  
  function openProduct(product) {
    window.location.href =
      `product.html?id=${encodeURIComponent(product.id)}`;
  }

  
  function renderSuggestions(query) {
    const searchTerm = query.trim().toLowerCase();

    searchSuggestions.innerHTML = "";

    if (!searchTerm) {
      searchSuggestions.classList.add("hidden");
      productSearch.setAttribute("aria-expanded", "false");
      return;
    }

    searchSuggestions.classList.remove("hidden");
    productSearch.setAttribute("aria-expanded", "true");

    
    searchSuggestions.innerHTML = Array.from(
      { length: 3 },
      () => `
        <div class="flex items-center gap-3 p-3 animate-pulse">
          <div class="h-14 w-14 shrink-0 rounded-lg bg-gray-200"></div>

          <div class="flex-1 space-y-2">
            <div class="h-4 w-3/4 rounded bg-gray-200"></div>
            <div class="h-3 w-1/2 rounded bg-gray-200"></div>
          </div>

          <div class="h-4 w-12 rounded bg-gray-200"></div>
        </div>
      `
    ).join("");

    
    const matches = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    
    setTimeout(() => {
      
      if (
        productSearch.value.trim().toLowerCase() !== searchTerm
      ) {
        return;
      }

      searchSuggestions.innerHTML = "";

      if (matches.length === 0) {
        const emptyMessage = document.createElement("div");

        emptyMessage.className =
          "p-4 text-sm text-slate-500";
        emptyMessage.textContent = "No matching shoes found.";

        searchSuggestions.appendChild(emptyMessage);
        return;
      }

      matches.forEach((product) => {
        const suggestion = document.createElement("button");

        suggestion.type = "button";
        suggestion.className =
          "flex w-full items-center gap-3 p-3 text-left transition hover:bg-orange-50";
        suggestion.setAttribute("role", "option");

       
        const image = document.createElement("img");

        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";
        image.className =
          "h-14 w-14 shrink-0 rounded-lg bg-slate-100 object-cover";

       
        image.addEventListener("error", () => {
          image.classList.add("hidden");
          console.warn("Product image not found:", product.image);
        });

        
        const details = document.createElement("div");
        details.className = "min-w-0 flex-1";

        const name = document.createElement("p");
        name.className =
          "truncate text-sm font-semibold text-slate-800";
        name.textContent = product.name;

        const category = document.createElement("p");
        category.className = "text-xs text-slate-500";
        category.textContent = product.category;

        details.append(name, category);

        
        const price = document.createElement("span");
        price.className =
          "shrink-0 text-sm font-bold text-orange-500";
        price.textContent = money(product.price);

        suggestion.append(image, details, price);

      
        suggestion.addEventListener("click", () => {
          openProduct(product);
        });

        searchSuggestions.appendChild(suggestion);
      });
    }, 350);
  }

  
  productSearch.addEventListener("input", () => {
    renderSuggestions(productSearch.value);
  });

  
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = productSearch.value.trim().toLowerCase();

    if (!searchTerm) return;

    const match = products.find((product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    if (match) {
      openProduct(match);
    } else {
      renderSuggestions(searchTerm);
    }
  });

  
  document.addEventListener("click", (event) => {
    if (
      !searchForm.contains(event.target) &&
      !searchSuggestions.contains(event.target)
    ) {
      searchSuggestions.classList.add("hidden");
      productSearch.setAttribute("aria-expanded", "false");
    }
  });

  productSearch.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchSuggestions.classList.add("hidden");
      productSearch.setAttribute("aria-expanded", "false");
    }
  });
});
