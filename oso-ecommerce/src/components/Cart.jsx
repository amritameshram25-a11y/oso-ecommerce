import { useEffect } from 'react'
import { formatPrice } from '../utils/formatPrice.js'

function Cart({ items, isOpen, onClose, onIncrease, onDecrease, onRemove }) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('overlay-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('overlay-open')
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="cart-backdrop" onMouseDown={onClose}>
      <aside
        aria-label="Shopping cart"
        aria-modal="true"
        className="cart-drawer"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="cart-header">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2>Your bag <span>({itemCount})</span></h2>
          </div>
          <button aria-label="Close shopping cart" className="modal-close" onClick={onClose} type="button">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <span aria-hidden="true">♡</span>
            <h3>Your bag is taking a breather.</h3>
            <p>Find something lovely to make it feel at home.</p>
            <button className="primary-button" onClick={onClose} type="button">
              Keep exploring
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img alt={item.name} src={item.image} />
                  <div className="cart-item-info">
                    <p className="product-category">{item.category}</p>
                    <h3>{item.name}</h3>
                    <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                    <div className="quantity-row">
                      <div className="quantity-control" aria-label={`Quantity: ${item.quantity}`}>
                        <button
                          aria-label={`Decrease ${item.name} quantity`}
                          disabled={item.quantity <= 1}
                          onClick={() => onDecrease(item.id)}
                          type="button"
                        >
                          −
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => onIncrease(item.id)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <button className="remove-button" onClick={() => onRemove(item.id)} type="button">
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div className="subtotal-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p>Shipping and taxes calculated at checkout.</p>
              <button className="continue-shopping" onClick={onClose} type="button">
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default Cart
