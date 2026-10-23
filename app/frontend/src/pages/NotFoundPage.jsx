import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-surface-container-high text-primary flex items-center justify-center mx-auto text-3xl font-black">
        404
      </div>
      <h1 className="text-2xl font-black text-on-surface">Page Not Found</h1>
      <p className="text-xs text-on-surface-variant">
        The phone listing or page you were looking for doesn't exist or may have been archived.
      </p>
      <div>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:bg-primary-container"
        >
          Return to Marketplace Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
