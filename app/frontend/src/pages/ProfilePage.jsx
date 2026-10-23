import React, { useState } from 'react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    bio: user?.bio || '',
    avatarUrl: user?.avatarUrl || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      await updateProfile(formData);
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      showToast('New password must be at least 8 characters', 'error');
      return;
    }

    try {
      setSavingPassword(true);
      await api.put('/auth/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      showToast('Password changed successfully!', 'success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      showToast(err.message || 'Failed to change password', 'error');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="pb-4 border-b border-surface-container">
        <h1 className="text-2xl font-black text-on-surface">Account Settings & Profile</h1>
        <p className="text-xs text-on-surface-variant mt-0.5">
          Update your public seller presence and manage account security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Profile Information */}
        <form onSubmit={handleProfileSubmit} className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-sm space-y-4">
          <h2 className="font-bold text-base text-on-surface">Public Profile Details</h2>

          <div>
            <label className="text-xs font-bold block mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full bg-surface-container-high border border-surface-container rounded-xl px-3 py-2 text-xs opacity-70 cursor-not-allowed"
            />
            <span className="text-[10px] text-outline mt-0.5 block">Email address cannot be changed</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold block mb-1">City / Region</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Avatar Image URL</label>
            <input
              type="url"
              value={formData.avatarUrl}
              onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Bio / Seller Note</label>
            <textarea
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:bg-primary-container disabled:opacity-50"
          >
            {savingProfile ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </form>

        {/* Password Change */}
        <form onSubmit={handlePasswordSubmit} className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container shadow-sm space-y-4">
          <h2 className="font-bold text-base text-on-surface">Security & Password</h2>

          <div>
            <label className="text-xs font-bold block mb-1">Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">New Password (min 8 chars)</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full bg-surface-container-low border border-surface-container rounded-xl px-3 py-2 text-xs"
              required
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="w-full py-2.5 rounded-xl bg-surface-container text-on-surface font-bold text-xs hover:bg-surface-container-high transition-colors disabled:opacity-50"
          >
            {savingPassword ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
