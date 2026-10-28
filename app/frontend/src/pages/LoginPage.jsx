import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      showToast('Logged in successfully!', 'success');
      navigate('/');
    } catch (err) {
      showToast(err.message || 'Login failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-surface border border-surface-container rounded-3xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-surface-container text-secondary flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-5 h-5 text-secondary" />
          </div>
          <h1 className="text-2xl font-black text-on-surface">Sign in to MobileMart</h1>
          <p className="text-xs text-on-surface-variant">
            Access your phone listings, inquiries, and saved favorites.
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-container text-xs space-y-2">
          <span className="font-bold text-[11px] uppercase tracking-wider text-on-surface-variant block text-center">
            Demo Credentials (1-Click Fill)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('buyer@mobilemart.com', 'BuyerPass123!')}
              className="py-1.5 px-2 bg-surface rounded-xl font-bold text-on-surface hover:bg-accent hover:text-white transition-colors border border-surface-container text-center"
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('seller@mobilemart.com', 'SellerPass123!')}
              className="py-1.5 px-2 bg-surface rounded-xl font-bold text-on-surface hover:bg-secondary hover:text-white transition-colors border border-surface-container text-center"
            >
              Seller
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@mobilemart.com', 'AdminPass123!')}
              className="py-1.5 px-2 bg-surface rounded-xl font-bold text-on-surface hover:bg-accent hover:text-white transition-colors border border-surface-container text-center"
            >
              Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1 text-on-surface">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1 text-on-surface">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3.5 py-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-accent text-on-accent font-bold text-xs shadow-sm hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-xs text-on-surface-variant pt-2 border-t border-surface-container">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-secondary font-bold hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
