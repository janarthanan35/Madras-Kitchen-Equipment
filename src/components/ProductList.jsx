import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X, SearchX } from 'lucide-react';
import { products, categories } from '../data';
import comingSoon from '../assets/coming-soon.svg';

const FALLBACK_IMAGE = comingSoon;

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const matchesSearch = (product, query) => {
    if (!query) return true;
    const q = query.trim().toLowerCase();
    if (!q) return true;

    const searchTokens = q.split(/\s+/).filter(Boolean);
    const nameStr = (product.name || '').toLowerCase();
    const catStr = (product.category || '').toLowerCase();
    const descStr = (product.description || '').toLowerCase();
    const keywordsList = (product.keywords || []).map(k => k.toLowerCase());
    const combinedText = `${nameStr} ${catStr} ${descStr} ${keywordsList.join(' ')}`;

    // Direct phrase match
    if (combinedText.includes(q)) return true;

    // All word tokens match anywhere in product text / keywords
    return searchTokens.every(token => combinedText.includes(token));
  };

  const filteredProducts = products.filter(product => {
    const matchesCat = activeCategory === 'All' || product.category === activeCategory;
    const matchesQ = matchesSearch(product, searchQuery);
    return matchesCat && matchesQ;
  });

  const handleSuggestionClick = (term) => {
    setSearchQuery(term);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Commercial Kitchen Solutions</h1>
        <p>Explore our wide range of professional kitchen equipment tailored for Indian and Continental cooking needs.</p>

        {/* Search Bar Section */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search kitchen equipment..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search kitchen equipment"
            />
            {searchQuery && (
              <button 
                type="button"
                className="clear-search-btn" 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                title="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
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

      {filteredProducts.length > 0 ? (
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
      ) : (
        <div className="no-results">
          <div className="no-results-icon">
            <SearchX size={52} strokeWidth={1.5} color="var(--primary)" />
          </div>
          <h3>No kitchen equipment found.</h3>
          <p className="no-results-hint">
            Try searching with another keyword such as Dosa, Idli, Tandoor, Stove, Grinder, or Fryer.
          </p>
          <div className="suggestion-tags">
            {['Dosa', 'Idli', 'Tandoor', 'Stove', 'Grinder', 'Fryer'].map((term) => (
              <button 
                key={term} 
                className="suggestion-tag-btn"
                onClick={() => handleSuggestionClick(term)}
              >
                {term}
              </button>
            ))}
          </div>
          {searchQuery && (
            <button 
              className="btn btn-secondary" 
              onClick={() => setSearchQuery('')}
              style={{ marginTop: '1.5rem' }}
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
