import { formatPrice } from '../utils/formatPrice.js'

function ProductCard({ product, onViewDetails, onAddToCart }) {
  return (
    <article className="product-card">
      <button
        aria-label={`View details for ${product.name}`}
        className="product-image-button"
        onClick={() => onViewDetails(product)}
        type="button"
      >
        <img alt={product.name} className="product-image" loading="lazy" src={product.image} />
        <span className={`stock-badge${product.inStock ? '' : ' sold-out'}`}>
          {product.inStock ? 'In stock' : 'Sold out'}
        </span>
        <span className="quick-view">Quick view <span aria-hidden="true">↗</span></span>
      </button>
      <div className="product-info">
        <div className="product-title-row">
          <div>
            <p className="product-category">{product.category}</p>
            <h3>{product.name}</h3>
          </div>
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
        <div className="product-card-bottom">
          <span className="product-rating" aria-label={`Rated ${product.rating} out of 5`}>
            <span aria-hidden="true">★</span> {product.rating.toFixed(1)}
          </span>
          <div className="product-actions">
            <button
              className="details-button"
              onClick={() => onViewDetails(product)}
              type="button"
            >
              View details
            </button>
            <button
              aria-label={`Add ${product.name} to cart`}
              className="add-cart-button"
              disabled={!product.inStock}
              onClick={() => onAddToCart(product)}
              type="button"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 8h14l1 12H4L5 8Z" />
                <path d="M9 9V6a3 3 0 0 1 6 0v3" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
