import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      showToast('Password must be at least 8 characters long', 'error');
      return;
    }

    try {
      setLoading(true);
      await register(formData);
      showToast('Account created successfully! Welcome to MobileMart.', 'success');
      navigate('/');
    } catch (err) {
      showToast(err.message || 'Registration failed. Please check inputs.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-surface border border-surface-container rounded-3xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-surface-container text-secondary flex items-center justify-center mx-auto shadow-sm">
            <UserPlus className="w-5 h-5 text-secondary" />
          </div>
          <h1 className="text-2xl font-black text-on-surface">Create an Account</h1>
          <p className="text-xs text-on-surface-variant">
            One account to both buy phones and list devices for sale.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1 text-on-surface">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Jordan Smith"
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1 text-on-surface">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1 text-on-surface">Password (min 8 characters) *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold block mb-1 text-on-surface">City / Region</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Austin, TX"
                className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-1 text-on-surface">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-accent text-on-accent font-bold text-xs shadow-sm hover:opacity-90 disabled:opacity-50 transition-all mt-2"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="text-center text-xs text-on-surface-variant pt-2 border-t border-surface-container">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
