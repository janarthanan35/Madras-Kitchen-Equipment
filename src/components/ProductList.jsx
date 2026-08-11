import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products, categories } from '../data';

const FALLBACK_IMAGE = "/images/coming-soon.svg";

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Commercial Kitchen Solutions</h1>
        <p>Explore our wide range of professional kitchen equipment tailored for Indian and Continental cooking needs.</p>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${activeCategory === 'All' ? 'active' : ''}`}
          onClick={() => setActiveCategory('All')}
        >
          All Equipment
        </button>
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <div className="card-image-wrap">
              <span className="badge">{product.category}</span>
              <img 
                src={product.images.front || FALLBACK_IMAGE} 
                alt={product.name} 
                className="card-image" 
                loading="lazy" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
            </div>
            <div className="card-content">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-desc">{product.description}</p>
              <div className="card-footer">
                <span className="price" style={{ fontSize: '1rem', color: 'var(--primary)' }}>
                  {product.price ? `₹${product.price.toLocaleString()}` : "Contact for Price"}
                </span>
                <span className="btn btn-secondary">
                  View <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
