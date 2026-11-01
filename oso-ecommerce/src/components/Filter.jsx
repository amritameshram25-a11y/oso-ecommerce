function Filter({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
}) {
  return (
    <aside className="filter-panel" id="categories" aria-label="Product filters">
      <div className="filter-heading">
        <h2>Filters</h2>
        <button className="clear-filters" onClick={onClear} type="button">
          Clear all
        </button>
      </div>
      <fieldset className="filter-group">
        <legend>Category</legend>
        <label className="category-option">
          <input
            checked={selectedCategory === 'All'}
            name="category"
            onChange={() => onCategoryChange('All')}
            type="radio"
          />
          <span>All categories</span>
        </label>
        {categories.map((category) => (
          <label className="category-option" key={category}>
            <input
              checked={selectedCategory === category}
              name="category"
              onChange={() => onCategoryChange(category)}
              type="radio"
            />
            <span>{category}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className="filter-group price-filter">
        <legend>Price range</legend>
        <div className="price-inputs">
          <label>
            <span>Min</span>
            <div className="price-input-wrap">
              <span>₹</span>
              <input
                aria-label="Minimum price"
                min="0"
                onChange={(event) => onMinPriceChange(event.target.value)}
                placeholder="0"
                type="number"
                value={minPrice}
              />
            </div>
          </label>
          <span className="price-separator">—</span>
          <label>
            <span>Max</span>
            <div className="price-input-wrap">
              <span>₹</span>
              <input
                aria-label="Maximum price"
                min="0"
                onChange={(event) => onMaxPriceChange(event.target.value)}
                placeholder="Any"
                type="number"
                value={maxPrice}
              />
            </div>
          </label>
        </div>
      </fieldset>
      <p className="filter-note">Thoughtful finds, made for everyday.</p>
    </aside>
  )
}

export default Filter
