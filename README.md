# ShoePAPI

ShoePAPI is a responsive shoe-shopping website built with HTML, Tailwind CSS, and vanilla JavaScript. It includes a homepage, product shop, product details, shopping cart, and contact page.

## JavaScript Features

1. **Contact form validation** – Checks the name, email, topic, and message, and displays validation errors or a success message.
2. **Product carousel** – Automatically cycles through product groups and includes Previous/Next buttons and indicator dots. It displays four products at a time on desktop, two on tablet, and one on phones.
3. **Live product search** – Shows matching product suggestions as the user types and lets the user open a selected product.
4. **Skeleton loading** – Displays animated placeholders briefly before showing search suggestions.
5. **Shopping cart** – Adds, removes, and updates item quantities; saves cart contents in the browser; and calculates subtotal, shipping, and total.
6. **Product filtering and sorting** – Filters by category and sorts by price or featured/newest order.
7. **Product detail interactions** – Displays product details and related products, and lets the user select a size and quantity before adding the product to the cart.
8. **Interactive FAQ** – Expands and collapses answers when clicked; only one answer is open at a time.

## Pages

- `index.html` – Homepage, product search, and featured-product carousel.
- `shop.html` – Product listings, category filters, sorting, and add-to-cart controls.
- `product.html` – Product information, size and quantity selection, related products, and add-to-cart controls.
- `cart.html` – Cart items, quantity controls, and order summary.
- `contact.html` – Validated contact form and interactive FAQ.

## Limitations

- The contact form validates the entered information and displays a success message, but does not send the message to a server.
- Checkout is a demonstration only and is not connected to payment processing.
- Product and cart data are stored in the browser; the site does not use a back-end server or database.
