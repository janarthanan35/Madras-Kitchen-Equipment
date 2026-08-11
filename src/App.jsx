import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import './index.css';

function App() {
  return (
    <Router>
      <header>
        <div className="container header-content">
          <Link to="/" className="logo">
            <ChefHat size={32} color="#f97316" />
            Madras Kitchen Equipments
          </Link>
          <nav style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ fontWeight: 500, color: 'var(--text-main)' }}>Products</Link>
            <a href="#" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>About Us</a>
            <a href="#" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Contact</a>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
