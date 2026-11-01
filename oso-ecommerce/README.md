# OSO Store

A responsive React storefront assignment built with React, JavaScript, and CSS. Product catalog, filtering, product details, and cart state all run in the browser; there is no backend, database, or paid API.

Product prices are displayed in Indian rupees (INR) and are set between ₹500 and ₹2,000.

## Requirements

- Node.js 20.19+ or 22.12+ (required by the installed Vite version)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite. To check the project:

```bash
npm run lint
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    Navbar.jsx       Responsive navigation, live search, and cart count
    ProductCard.jsx  Reusable product card and product actions
    Filter.jsx       Category and minimum/maximum price filters
    ProductModal.jsx Product details dialog
    Cart.jsx         Cart drawer, quantity controls, and subtotal
  data/
    products.js     Twelve local products across four categories
  App.jsx            Shared state, combined filtering, sorting, and page layout
  App.css            Storefront components and responsive layouts
  index.css          Global styles, typography, and theme tokens
  main.jsx           React application entry point
```

## Dependencies

Runtime dependencies are `react` and `react-dom`. Vite and ESLint are development dependencies. The site does not use a component, icon, or API dependency.

## Feature check

1. Confirm all 12 items appear in the collection.
2. Search by a product name; results update as you type. Clear the query to restore results.
3. Use a category option or category chip to filter the collection.
4. Enter a minimum price, maximum price, or both. Combine them with search and category filters.
5. Try each sorting option: Featured, Price Low to High, Price High to Low, and Rating Highest First.
6. Open a product with **View details** or **Quick view**; close it with the close button, backdrop, or Escape.
7. Add a product from the card or detail dialog. The cart opens and the navbar count updates.
8. Increase/decrease quantities in the cart. Quantity cannot go below one; use **Remove** to remove an item.
9. Confirm the item count and subtotal update, and the empty-cart message appears after removing all items.
10. Repeat at desktop, tablet, and mobile widths using browser responsive tools.

## GitHub and Vercel

1. Review the project locally with `npm run lint` and `npm run build`.
2. Create a GitHub repository, then from this project directory run:

   ```bash
   git init
   git add .
   git commit -m "Build OSO Store storefront"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

3. In Vercel, import the GitHub repository. Vercel detects Vite automatically; use `npm run build` as the build command and `dist` as the output directory.
4. Deploy. Future pushes to the connected branch can trigger new deployments.

Product photography is served by Unsplash image URLs and therefore needs an internet connection. Replace those URLs in `src/data/products.js` with locally hosted images if desired.
