import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

const ContactModal = ({ isOpen, onClose, selectedProduct = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        message: `Hello, I would like to request a price quote and details for "${selectedProduct.name}".`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        message: ''
      }));
    }
    setSubmitted(false);
  }, [selectedProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = selectedProduct 
      ? `Hi Madras Kitchen Equipment, I am inquiring about ${selectedProduct.name}.`
      : `Hi Madras Kitchen Equipment, I have an inquiry about your kitchen equipment.`;
    window.open(`https://wa.me/9384592696?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <h2>Contact Madras Kitchen Equipment</h2>
          <p>Get in touch for custom quotes, bulk orders, and commercial kitchen solutions.</p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Panel */}
          <div className="contact-info-panel">
            <h3>Get In Touch</h3>

            <div className="info-item">
              <div className="info-icon">
                <Phone size={20} color="var(--primary)" />
              </div>
              <div>
                <span className="info-label">Mobile Number</span>
                <a href="tel:9384592696" className="info-value">9384592696</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Mail size={20} color="var(--primary)" />
              </div>
              <div>
                <span className="info-label">Email Address</span>
                <a href="mailto:rjanarthana803@gmail.com" className="info-value">rjanarthana803@gmail.com</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <MapPin size={20} color="var(--primary)" />
              </div>
              <div>
                <span className="info-label">Store Location</span>
                <div className="info-value">Madras Kitchen Equipment</div>
                <div className="info-subtext">Irvine, California, United States</div>
              </div>
            </div>

            <div className="quick-connect">
              <button type="button" className="btn btn-whatsapp" onClick={handleWhatsApp}>
                <MessageSquare size={18} /> Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Form Panel */}
          <div className="contact-form-panel">
            {submitted ? (
              <div className="submission-success">
                <CheckCircle2 size={56} color="var(--primary)" />
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. Our team will contact you shortly.</p>
                <button className="btn btn-secondary" onClick={() => setSubmitted(false)} style={{ marginTop: '1rem' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3>Send Us a Message</h3>
                
                {selectedProduct && (
                  <div className="product-inquiry-badge">
                    Inquiring for: <strong>{selectedProduct.name}</strong>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="modal-name">Full Name</label>
                  <input 
                    id="modal-name"
                    type="text" 
                    required 
                    placeholder="John Doe" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="modal-email">Email Address</label>
                    <input 
                      id="modal-email"
                      type="email" 
                      required 
                      placeholder="you@example.com" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="modal-phone">Mobile Number</label>
                    <input 
                      id="modal-phone"
                      type="tel" 
                      required 
                      placeholder="9384592696" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="modal-message">Message / Specifications</label>
                  <textarea 
                    id="modal-message"
                    rows="3" 
                    required 
                    placeholder="Tell us your kitchen requirements..." 
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={18} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
