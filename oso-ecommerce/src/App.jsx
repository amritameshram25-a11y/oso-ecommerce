import { useMemo, useState } from 'react'
import Cart from './components/Cart.jsx'
import Filter from './components/Filter.jsx'
import Navbar from './components/Navbar.jsx'
import ProductCard from './components/ProductCard.jsx'
import ProductModal from './components/ProductModal.jsx'
import { categories, products } from './data/products.js'
import './App.css'

function App() {
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortOrder, setSortOrder] = useState('featured')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    const min = minPrice === '' ? null : Number(minPrice)
    const max = maxPrice === '' ? null : Number(maxPrice)

    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query)
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory
      const matchesMinPrice = min === null || product.price >= min
      const matchesMaxPrice = max === null || product.price <= max

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
    })

    if (sortOrder === 'price-low') {
      return [...filteredProducts].sort((first, second) => first.price - second.price)
    }

    if (sortOrder === 'price-high') {
      return [...filteredProducts].sort((first, second) => second.price - first.price)
    }

    if (sortOrder === 'rating') {
      return [...filteredProducts].sort((first, second) => second.rating - first.rating)
    }

    return filteredProducts
  }, [search, selectedCategory, minPrice, maxPrice, sortOrder])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  function clearFilters() {
    setSelectedCategory('All')
    setMinPrice('')
    setMaxPrice('')
    setSearch('')
    setSortOrder('featured')
  }

  function addToCart(product) {
    if (!product.inStock) return

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
    setSelectedProduct(null)
    setIsCartOpen(true)
  }

  function changeQuantity(productId, amount) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    )
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearch}
        search={search}
      />
      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A little more intentional</p>
            <h1>Good things for <span>everyday living.</span></h1>
            <p className="hero-description">
              Thoughtful finds for your home, your routine, and everything in between.
              Discover pieces that feel like you.
            </p>
            <a className="primary-button hero-button" href="#shop">
              Explore the collection <span aria-hidden="true">→</span>
            </a>
            <div className="hero-note">
              <span className="hero-note-stars" aria-hidden="true">★★★★★</span>
              <span>Loved by our little community</span>
            </div>
          </div>
          <div className="hero-art" role="img" aria-label="Curated home and lifestyle essentials">
            <img
              alt="A calm, sunlit living room with considered modern details"
              className="hero-photo"
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=90"
            />
            <div className="hero-sticker">
              <span>THE OSO</span>
              <strong>edit</strong>
              <span>NO. 01 — EVERYDAY</span>
            </div>
            <div className="hero-index">01 <span>/</span> 04</div>
          </div>
          <span className="hero-side-note">OBJECTS, CHOSEN WITH CARE</span>
        </section>

        <section className="shop-section" id="shop" aria-labelledby="shop-heading">
          <div className="shop-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-line" /> The considered collection</p>
              <h2 id="shop-heading">Find your <span>everyday favorite.</span></h2>
            </div>
            <p className="shop-intro">
              Useful, lovely, and made to be part of your everyday.
              Take a look around.
            </p>
          </div>
          <div className="shop-toolbar">
            <span className="result-count" aria-live="polite">
              Showing <strong>{visibleProducts.length}</strong> of {products.length} pieces
            </span>
            <label className="sort-control">
              <span>Sort by</span>
              <select onChange={(event) => setSortOrder(event.target.value)} value={sortOrder}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: Highest First</option>
              </select>
            </label>
          </div>
          <div className="shop-layout">
            <Filter
              categories={categories}
              maxPrice={maxPrice}
              minPrice={minPrice}
              onCategoryChange={setSelectedCategory}
              onClear={clearFilters}
              onMaxPriceChange={setMaxPrice}
              onMinPriceChange={setMinPrice}
              selectedCategory={selectedCategory}
            />
            <div className="catalog">
              <div className="category-chips" aria-label="Filter by category">
                <button
                  aria-pressed={selectedCategory === 'All'}
                  className={selectedCategory === 'All' ? 'active' : ''}
                  onClick={() => setSelectedCategory('All')}
                  type="button"
                >
                  All finds <span>{products.length}</span>
                </button>
                {categories.map((category) => (
                  <button
                    aria-pressed={selectedCategory === category}
                    className={selectedCategory === category ? 'active' : ''}
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
              </div>
              {visibleProducts.length > 0 ? (
                <div className="product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      onAddToCart={addToCart}
                      onViewDetails={setSelectedProduct}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-results">
                  <span aria-hidden="true">⌕</span>
                  <h3>No finds this time.</h3>
                  <p>Try changing your search or clearing one of your filters.</p>
                  <button className="secondary-button" onClick={clearFilters} type="button">
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="closing-note" aria-label="OSO Store promise">
          <span className="closing-mark" aria-hidden="true">o</span>
          <p>Less, but <em>lovelier.</em></p>
          <span>GOOD THINGS, CHOSEN WITH CARE</span>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-about">
            <a className="footer-brand" href="#home">oso<span>.</span></a>
            <p>
              Thoughtful finds for your home, your routine, and everything in between.
              Good things, chosen with care.
            </p>
            <span className="footer-made">A little more intentional, every day.</span>
          </div>
          <nav className="footer-links" aria-label="Explore OSO Store">
            <h2>Explore</h2>
            <a href="#home">Home</a>
            <a href="#shop">Shop all</a>
            {categories.map((category) => (
              <a
                href="#shop"
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </a>
            ))}
          </nav>
          <div className="footer-promise">
            <h2>The OSO point of view</h2>
            <p>Fewer, better things.</p>
            <p>Everyday pieces that feel like you.</p>
            <p>Thoughtful choices, without the fuss.</p>
          </div>
          <div className="footer-newsletter">
            <p className="eyebrow"><span className="eyebrow-line" /> A note from OSO</p>
            <h2>A little good in your inbox.</h2>
            <p>Occasional new finds and small things worth sharing.</p>
            <form
              className="newsletter-form"
              onSubmit={(event) => {
                event.preventDefault()
                event.currentTarget.reset()
                setNewsletterSubmitted(true)
              }}
            >
              <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
              <input
                autoComplete="email"
                id="newsletter-email"
                placeholder="Your email address"
                required
                type="email"
              />
              <button aria-label="Join the OSO newsletter demo" type="submit">
                <span aria-hidden="true">→</span>
              </button>
            </form>
            <p aria-live="polite" className="newsletter-note">
              {newsletterSubmitted
                ? 'Thanks! This demo does not send or store emails.'
                : 'Newsletter preview only — no email will be sent.'}
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 OSO Store. Made with intention.</span>
          <span>Frontend internship project · No orders or payments are processed.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
      <ProductModal
        onAddToCart={addToCart}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
      <Cart
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onDecrease={(productId) => changeQuantity(productId, -1)}
        onIncrease={(productId) => changeQuantity(productId, 1)}
        onRemove={removeFromCart}
      />
    </>
  )
}

export default App
