import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Truck, ShieldCheck, ZoomIn, FileText } from 'lucide-react';
import { products } from '../data';
import comingSoon from '../assets/coming-soon.svg';

const FALLBACK_IMAGE = comingSoon;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  
  const [activeImageKey, setActiveImageKey] = useState('front');
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Product not found</h2>
        <button className="btn" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
          Back to Products
        </button>
      </div>
    );
  }

  const imageKeys = ['front', 'side', 'rear', 'top', 'detail'];
  const activeImageUrl = product.images?.[activeImageKey] || FALLBACK_IMAGE;

  return (
    <div className="container">
      <div className="bread-crumb">
        <Link to="/">Products</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)' }}>{product.category}</span>
        <span>/</span>
        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{product.name}</span>
      </div>

      <div className="detail-container">
        {/* Gallery Section */}
        <div className="gallery-section">
          <div 
            className="main-image-container"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            style={{ cursor: isZoomed ? 'zoom-in' : 'default' }}
          >
            {isZoomed && (
              <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.8)', padding: 6, borderRadius: '50%', zIndex: 10 }}>
                <ZoomIn size={20} color="var(--text-main)" />
              </div>
            )}
            <img 
              src={activeImageUrl} 
              alt={`${product.name} - ${activeImageKey} view`}
              className="main-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_IMAGE;
              }}
              style={{
                transform: isZoomed ? 'scale(1.4)' : 'scale(1)',
                transformOrigin: 'center center'
              }}
            />
          </div>
          <div className="thumbnail-strip">
            {imageKeys.map(key => (
              <div 
                key={key} 
                className={`thumbnail ${activeImageKey === key ? 'active' : ''}`}
                onClick={() => setActiveImageKey(key)}
                title={`${key.toUpperCase()} View`}
              >
                <img 
                  src={product.images?.[key] || FALLBACK_IMAGE} 
                  alt={`${key} view thumbnail`} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: 2,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.65rem',
                  textTransform: 'capitalize',
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: '#fff',
                  padding: '1px 4px',
                  borderRadius: '3px'
                }}>
                  {key}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">
            {product.price ? `₹${product.price.toLocaleString()}` : "Contact for Price"}
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.8 }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button className="btn" style={{ padding: '1rem 2rem', fontSize: '1rem', flex: 1 }}>
              <ShoppingCart size={20} /> Request Price Quote
            </button>
            <button className="btn btn-secondary" style={{ padding: '1rem' }} onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <Truck size={20} color="var(--primary)" /> Custom Fabrication Available
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <ShieldCheck size={20} color="var(--primary)" /> Heavy Duty Commercial Grade
            </div>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Technical Specifications</h3>
          {product.specs && product.specs.length > 0 ? (
            <div className="specs-grid">
              {product.specs.map((spec, i) => (
                <div key={i} className="spec-item">
                  <div className="spec-label">{spec.label}</div>
                  <div className="spec-value">{spec.value}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: '#f8fafc',
              border: '1px dashed var(--border-color)',
              padding: '1.5rem',
              borderRadius: '12px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FileText size={20} color="var(--primary)" />
              <span>Contact us for specifications</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
