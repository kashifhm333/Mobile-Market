import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, useTheme, THEME_STORAGE_KEY } from '../src/context/ThemeContext.jsx';
import { ToastProvider } from '../src/context/ToastContext.jsx';
import { AuthProvider } from '../src/context/AuthContext.jsx';
import { FavoritesProvider } from '../src/context/FavoritesContext.jsx';
import Navbar from '../src/components/layout/Navbar.jsx';

// Component to test useTheme hook directly
const ThemeConsumer = () => {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <span data-testid="is-dark">{isDark ? 'true' : 'false'}</span>
      <button onClick={toggleTheme} data-testid="toggle-btn">Toggle</button>
      <button onClick={() => setTheme('dark')} data-testid="set-dark-btn">Set Dark</button>
      <button onClick={() => setTheme('light')} data-testid="set-light-btn">Set Light</button>
    </div>
  );
};

describe('Theme Switcher & ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('initializes with default light theme and toggles to dark theme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const themeSpan = screen.getByTestId('current-theme');
    const isDarkSpan = screen.getByTestId('is-dark');
    const toggleBtn = screen.getByTestId('toggle-btn');

    expect(themeSpan.textContent).toBe('light');
    expect(isDarkSpan.textContent).toBe('false');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Toggle to Dark
    fireEvent.click(toggleBtn);

    expect(themeSpan.textContent).toBe('dark');
    expect(isDarkSpan.textContent).toBe('true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    // Toggle back to Light
    fireEvent.click(toggleBtn);

    expect(themeSpan.textContent).toBe('light');
    expect(isDarkSpan.textContent).toBe('false');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('renders theme toggle button in Navbar and responds to click', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <FavoritesProvider>
                <Navbar />
              </FavoritesProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </BrowserRouter>
    );

    const toggleBtn = screen.getByRole('button', {
      name: /Switch to dark theme/i
    });
    expect(toggleBtn).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Click toggle button
    fireEvent.click(toggleBtn);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    // Button label updates to switch back to light
    const switchBackBtn = screen.getByRole('button', {
      name: /Switch to light theme/i
    });
    expect(switchBackBtn).toBeInTheDocument();

    // Click back to light
    fireEvent.click(switchBackBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('restores theme from localStorage on initial render', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
