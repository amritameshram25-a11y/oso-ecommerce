function Navbar({ cartCount, onCartClick, onSearchChange, search }) {
  return (
    <>
      <div className="announcement">
        A better everyday starts here <span>·</span> Complimentary shipping over ₹1,500
      </div>
      <header className="site-header">
        <div className="header-main">
          <a className="brand" href="#home" aria-label="OSO Store home">
            <span className="brand-mark">o</span>so<span className="brand-period">.</span>
            <span className="brand-caption">STORE</span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#shop">Shop</a>
            <a href="#categories">Categories</a>
          </nav>
          <form
            className="nav-search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.3 4.3" />
            </svg>
            <input
              aria-label="Search products by name"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search products..."
              type="search"
              value={search}
            />
          </form>
          <button
            aria-label={`Open shopping cart, ${cartCount} items`}
            className="cart-trigger"
            onClick={onCartClick}
            type="button"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 8h14l1 12H4L5 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
            <span className="cart-trigger-label">Bag</span>
            <span className="cart-count" aria-live="polite">{cartCount}</span>
          </button>
        </div>
        <form
          className="mobile-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.3 4.3" />
          </svg>
          <input
            aria-label="Search products by name"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products..."
            type="search"
            value={search}
          />
        </form>
      </header>
    </>
  )
}

export default Navbar
