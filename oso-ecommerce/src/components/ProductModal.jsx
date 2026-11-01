import { useEffect } from 'react'
import { formatPrice } from '../utils/formatPrice.js'

function ProductModal({ product, onClose, onAddToCart }) {
  useEffect(() => {
    if (!product) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('overlay-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('overlay-open')
    }
  }, [product, onClose])

  if (!product) return null

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        aria-labelledby="modal-product-title"
        aria-modal="true"
        className="product-modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button aria-label="Close product details" className="modal-close" onClick={onClose} type="button">
          <span aria-hidden="true">×</span>
        </button>
        <div className="modal-image-wrap">
          <img alt={product.name} className="modal-image" src={product.image} />
        </div>
        <div className="modal-copy">
          <p className="product-category">{product.category}</p>
          <h2 id="modal-product-title">{product.name}</h2>
          <div className="modal-rating">
            <span aria-hidden="true">★</span> {product.rating.toFixed(1)}
            <span className={`modal-stock${product.inStock ? '' : ' sold-out-text'}`}>
              {product.inStock ? 'In stock' : 'Currently unavailable'}
            </span>
          </div>
          <p className="modal-price">{formatPrice(product.price)}</p>
          <p className="modal-description">{product.description}</p>
          <button
            className="primary-button modal-add-button"
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
            type="button"
          >
            Add to cart <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProductModal
