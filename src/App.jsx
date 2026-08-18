import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChefHat, Phone, Mail, MapPin, Heart } from 'lucide-react';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactModal from './components/ContactModal';
import './index.css';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenContact = (product = null) => {
    setSelectedProduct(product);
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Router>
      <header>
        <div className="container header-content">
          <Link to="/" className="logo">
            <ChefHat size={32} color="#f97316" />
            <span>Madras Kitchen Equipment</span>
          </Link>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Products</Link>
            <button 
              type="button" 
              className="nav-link-btn" 
              onClick={() => handleOpenContact()}
            >
              About Us
            </button>
            <button 
              type="button" 
              className="nav-link-btn nav-contact-btn" 
              onClick={() => handleOpenContact()}
            >
              Contact Us
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductList onOpenContact={handleOpenContact} />} />
          <Route path="/product/:id" element={<ProductDetail onOpenContact={handleOpenContact} />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-col">
            <div className="footer-logo">
              <ChefHat size={28} color="#f97316" />
              <span>Madras Kitchen Equipment</span>
            </div>
            <p className="footer-tagline">
              Premium commercial kitchen equipment, stainless steel fabrication, and hotel cooking solutions.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Catalog</Link></li>
              <li><button type="button" className="footer-link-btn" onClick={() => handleOpenContact()}>About Us</button></li>
              <li><button type="button" className="footer-link-btn" onClick={() => handleOpenContact()}>Contact Support</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Details</h4>
            <div className="footer-contact-item">
              <Phone size={18} color="var(--primary)" />
              <a href="tel:9384592696">9384592696</a>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} color="var(--primary)" />
              <a href="mailto:rjanarthana803@gmail.com">rjanarthana803@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <MapPin size={18} color="var(--primary)" />
              <span>Irvine, California, United States</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Madras Kitchen Equipment. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ContactModal 
        isOpen={isContactOpen}
        onClose={handleCloseContact}
        selectedProduct={selectedProduct}
      />
    </Router>
  );
}

export default App;
