import ProductCard from './ProductCard.jsx'

export default function ProductList({ products, title = 'All products' }) {
  return (
    <section>
      <p className="section-label">{title}</p>
      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products match that search. Try a different term or browse all products.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
