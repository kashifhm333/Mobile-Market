import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Design System: Mandatory Color Palette Tokens', () => {
  const cssPath = path.resolve(__dirname, '../src/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  it('defines the exact 5 light theme tokens in :root[data-theme="light"]', () => {
    expect(cssContent).toMatch(/--text:\s*#000000;/);
    expect(cssContent).toMatch(/--background:\s*#fbf9f9;/);
    expect(cssContent).toMatch(/--primary:\s*#777e7d;/);
    expect(cssContent).toMatch(/--secondary:\s*#3a6464;/);
    expect(cssContent).toMatch(/--accent:\s*#233432;/);
  });

  it('defines the exact 5 dark theme tokens in :root[data-theme="dark"]', () => {
    expect(cssContent).toMatch(/--text:\s*#ffffff;/);
    expect(cssContent).toMatch(/--background:\s*#070404;/);
    expect(cssContent).toMatch(/--primary:\s*#818887;/);
    expect(cssContent).toMatch(/--secondary:\s*#9bc5c5;/);
    expect(cssContent).toMatch(/--accent:\s*#cbdcda;/);
  });

  it('contains data-theme="light" and data-theme="dark" selectors', () => {
    expect(cssContent).toContain(':root[data-theme="light"]');
    expect(cssContent).toContain(':root[data-theme="dark"]');
  });

  it('does not contain any material symbols rules or font references', () => {
    expect(cssContent).not.toContain('Material Symbols Outlined');
    expect(cssContent).not.toContain('.material-symbols-outlined');
  });
});
